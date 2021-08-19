<template>
    <v-container>
        <v-row justify="center" class="my-8">
            <v-col class="col-6 text-center text-h2 primary--text">
                <h1 class="">HARK</h1>
            </v-col>
        </v-row>
        
        <v-row justify="center">
            <v-col class="col-6">
                <h1>LOG IN</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col class="col-6">
                <form autocomplete="off" @submit.prevent="formLogin">
                    <v-text-field
                        autocomplete="off"
                        v-model="login.email"
                        :error-messages="emailErrors()"
                        label="E-mail"
                        required
                        @enter="formLogin"
                        @input="$v.login.email.$touch()"
                        @blur="$v.login.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        v-model="login.password"
                        :error-messages="passwordErrors()"
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @enter="formLogin"
                        @click:append="showpass = !showpass"
                        @input="$v.login.password.$touch()"
                        @blur="$v.login.password.$touch()"                
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        class="mr-4 my-4"
                        color="primary"
                        :disabled="!isFormValid"
                    >
                    Login
                    </v-btn>
                </form>
            </v-col>

        </v-row>
        
        <v-row justify="center">
            <v-col class="col-6">
                <v-img
                    style="cursor: pointer;"
                    lazy-src="/google.png"
                    max-height="35"
                    max-width="180"
                    src="/google.png"
                    @click="loginWithGoogle"
                ></v-img>
            </v-col>

        </v-row>

        <v-snackbar
            color="error"
            v-model="errorSnackbar"
        >
        {{ errorMessage }}

        <template v-slot:action="{ attrs }">
            <v-btn
            color="accent"
            text
            v-bind="attrs"
            @click="errorSnackbar = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],

    validations: {
      login: {
        password: { required, minLength: minLength(8) },
        email: { required, email },
      }
    },
    data() {
        return {
            errorSnackbar: false,
            errorMessage: '',
            showpass: false,
            statusMessage: '',
            submitted: false,
            login: {
                email: 'test1@email.com',
                password: 'jost883446',
            },
        }
    },
    computed: {
        isFormValid() {
            return !this.$v.$invalid;
        }
    },
    mounted() { 
        this.$nuxt.$emit('isPageLoading', false);

        if( this.$auth.loggedIn && this.$auth.strategy.name == 'google' && this.$auth.strategy.token.get() ) {
            this.$nuxt.$emit('isPageLoading', true);
            this.saveUserToDB();
        }

        if( this.$auth.loggedIn && this.$auth.strategy.name == 'laravelJWT' ) {
            this.$router.push('/newsfeed');
        }
    },
    methods: {
        formLogin() {
            this.$nuxt.$emit('isPageLoading', true);

            if( !this.isFormValid ) return;
            this.$auth.loginWith('laravelJWT', {
                data: this.login, 
            })
            .then((response) => {
                if( response.data.access_token ) {
                    this.$nuxt.$emit('isPageLoading', false);
                    this.$router.push('/newsfeed');
                }
            })
            .catch((e) => {
                this.$nuxt.$emit('isPageLoading', false);

                if( e.response.status == 401 ) {
                    this.errorMessage = 'The password you entered is incorrect.';
                    this.errorSnackbar = true;

                    this.login.password = '';
                    this.$v.login.password.$touch();
                }else {
                    console.log('Something went wrong.');
                }
            });
        },
        loginWithGoogle() {
            this.$auth.loginWith('google');
        },
        saveUserToDB() {
            const token = this.$auth.strategy.token.get();
            const userInfo = {...this.$auth.user, token};

            console.log(this.$auth);
            this.$axios
            .post('/api/loginWithGoogle', userInfo)
            .then(response => {
                if( response.data.status == 'success' ) {
                    this.googleLoginGetUser(token);
                }else {
                    this.info = response.data.message;
                }
            });
        },
        googleLoginGetUser(access_token) {
            this.$axios
            .post('/api/megoogle', { access_token: access_token })
            .then(response => {
                if( response.data ) {
                    this.$nuxt.$emit('isPageLoading', false);
                    this.$router.push('/newsfeed');
                }else {
                    this.info = response.data.message;
                }
            });
        },
        passwordErrors (errors = []) {
            if (!this.$v.login.password.$dirty) return errors;
            !this.$v.login.password.minLength && errors.push('Password should be at least 8 characters long.');
            !this.$v.login.password.required && errors.push('Password is required.');

            return errors;
        },
        emailErrors (errors = []) {
            if (!this.$v.login.email.$dirty) return errors;
            !this.$v.login.email.email && errors.push('Must be valid e-mail');
            !this.$v.login.email.required && errors.push('E-mail is required');

            return errors;
        },
    }//methods
}
</script>
