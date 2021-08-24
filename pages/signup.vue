<template>
    <v-container>
        <v-row justify="center" class="my-8">
            <v-col class="col-6 text-center text-h2 primary--text">
                <h1>HARK</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col class="col-6">
                <h1>SIGN UP</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col class="col-6">
                <form autocomplete="off" @submit.prevent="createUser">
                    <v-text-field
                        autocomplete="off"
                        v-model="signup.name"
                        :error-messages="nameErrors()"
                        label="Name"
                        required
                        @enter="createUser"                    
                        @input="$v.signup.name.$touch()"
                        @blur="$v.signup.name.$touch()"
                    ></v-text-field>

                    <v-text-field
                        autocomplete="off"
                        v-model="signup.email"
                        :error-messages="emailErrors()"
                        label="E-mail"
                        required
                        @enter="createUser"
                        @input="$v.signup.email.$touch()"
                        @blur="$v.signup.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        v-model="signup.password"
                        :error-messages="passwordErrors()"
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @enter="createUser"
                        @click:append="showpass = !showpass"
                        @input="$v.signup.password.$touch()"
                        @blur="$v.signup.password.$touch()"                
                    ></v-text-field>

                    <v-btn
                        type="submit"
                        class="mr-4 my-4"
                        color="primary"
                        :disabled="!isFormValid"
                    >
                    Sign Up
                    </v-btn>
                </form>
            </v-col>

        </v-row>
        
        <v-row justify="center">
            <v-col class="col-6">
                <v-img
                    style="cursor: pointer"
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
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
      signup: {
        password: { required, minLength: minLength(8) },
        email: { required, email },
        name: { required },
      }
    },
    data() {
        return {
            errorSnackbar: false,
            errorMessage: '',
            showpass: false,
            statusMessage: '',
            submitted: false,
            signup: {
                email: 'test1@email.com',
                password: 'jost883446',
                name: 'Jones'
            },
        }
    },
    computed: {
        isFormValid() {
            return !this.$v.$invalid
        }
    },
    mounted() {      
        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
  
        if( this.$auth.loggedIn && this.$auth.strategy.name == 'google' && this.$auth.strategy.token.get() ) {
            this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)
            this.saveUserToDB()
        }
    },
    methods: {
        createUser() {
            this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

            this.$axios.post('/api/register', this.signup)
            .then((response) => {
                if( response.data.access_token ) {
                    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
                    this.$router.push({ name: 'newsfeed' })
                }
            })
            .catch((e) => {
                if( e.response.status == 422 ) {
                    this.errorMessage = e.response.data.message
                    this.errorSnackbar = true

                    this.signup.email = ''
                    this.$v.signup.email.$touch()
                }
                this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
            })
        },
        loginWithGoogle() {
            this.$auth.loginWith('google')
        },
        saveUserToDB() {
            const token = this.$auth.strategy.token.get()
            const userInfo = {...this.$auth.user, token}

            this.$axios
            .post('/api/loginWithGoogle', userInfo)
            .then(response => {
                if( response.data.status == 'success' ) {
                    this.googleLoginGetUser(token)
                }else {
                    this.info = response.data.message
                }
            })
        },
        googleLoginGetUser(access_token) {
            this.$axios
            .post('/api/megoogle', { access_token: access_token })
            .then(response => {
                if( response.data ) {
                    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)
                    this.$router.push({ name: 'newsfeed' })
                }else {
                    this.info = response.data.message
                }
            })
        },
        nameErrors (errors = []) {
            if (!this.$v.signup.name.$dirty) return errors
            !this.$v.signup.name.required && errors.push('Name is required.')

            return errors
        },
        passwordErrors (errors = []) {
            if (!this.$v.signup.password.$dirty) return errors
            !this.$v.signup.password.minLength && errors.push('Password should be at least 8 characters long.')
            !this.$v.signup.password.required && errors.push('Password is required.')

            return errors
        },
        emailErrors (errors = []) {
            if (!this.$v.signup.email.$dirty) return errors
            !this.$v.signup.email.email && errors.push('Must be valid e-mail')
            !this.$v.signup.email.required && errors.push('E-mail is required')

            return errors
        },
    }
}
</script>
