<template>
    <v-container>
        <v-row justify="center" class="my-8">
            <v-col class="col-4 text-center text-h2 primary--text">
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
                <form autocomplete="off" @submit.prevent="formLogin" method="post">
                    <v-text-field
                        autocomplete="off"
                        v-model="login.email"
                        :error-messages="emailErrors()"
                        label="E-mail"
                        required
                        @enter="formLogin"
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
                <LoginGoogleButton/>
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
      login: {
        password: { required, minLength: minLength(8) },
        email: { required, email },
      }
    },
    data: () => ({
        errorSnackbar: false,
        errorMessage: '',
        showpass: false,
        statusMessage: '',
        submitted: false,
        login: {
            email: 'quick@email.com',
            password: 'jost883446',
        },        
    }),
    computed: {
        isFormValid() {
            return !this.$v.$invalid
        },
    },
    mounted() {
        console.log(this.$store)
        console.log(this.$fire)
    },
    methods: {
        formLogin() {
            if( !this.isFormValid ) return
            
            this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)
            this.$fire.auth.signInWithEmailAndPassword(this.login.email, this.login.password)
            .then((response) => {
                if( response.user ) {
                    this.loginBackend()
                }

            })
            .catch((e) => {
                console.log(e)
                if( e.code == 'auth/wrong-password' ) {
                    this.errorMessage = 'The password you entered is incorrect.'
                    this.login.password = ''
                    this.$v.login.password.$touch()
                }else {
                    // auth/user-disabled
                    // auth/invalid-email
                    // auth/user-not-found
                    this.errorMessage = e.message
                    this.$v.login.email.$touch()
                }

                this.errorSnackbar = true
                this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
            })
        },

        loginBackend() {
            this.$axios.post(`/api/login`, {email: this.login.email, password: this.login.password})
            .then((response) => {
                if( response.data.access_token ) {
                    this.$store.dispatch('firebaseAuth/UPDATE_AUTH_HEADER_TOKEN', response.data.access_token)
                    this.getAuthUser(this.login.email)
                }
            })
            .catch((e) => {
                console.log(e.response)
                if( e.response.status == 401 ) {
                    this.errorMessage = 'Email or Password incorrect. Please try again.'
                    this.login.password = ''
                    this.$v.login.password.$touch()
                    this.errorSnackbar = true
                }
                this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
            })

        },

        getAuthUser(email) {
            this.$axios.get(`/api/user?email=${email}`)
            .then((response) => {
                this.$store.dispatch('firebaseAuth/UPDATE_USER_INFO', response.data.user)
                this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
                this.$router.push({ name: 'newsfeed' })
            })
            .catch((e) => {
                console.log(e)
            })
        },
        
        passwordErrors (errors = []) {
            if (!this.$v.login.password.$dirty) return errors
            !this.$v.login.password.minLength && errors.push('Password should be at least 8 characters long.')
            !this.$v.login.password.required && errors.push('Password is required.')

            return errors
        },

        emailErrors (errors = []) {
            if (!this.$v.login.email.$dirty) return errors
            !this.$v.login.email.email && errors.push('Must be valid e-mail')
            !this.$v.login.email.required && errors.push('E-mail is required')

            return errors
        },
    }//methods
}
</script>
