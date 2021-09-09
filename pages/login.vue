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
                <form autocomplete="off" @submit.prevent="formLogin">
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
            return !this.$v.$invalid
        },
    },
    methods: {
        formLogin() {
            if( !this.isFormValid ) return
            
            this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

            this.$auth.loginWith('laravelJWT', { data: this.login })
            .then((response) => {
                if( response.data.access_token ) {
                    this.$router.push({ name: 'newsfeed' })
                }
            })
            .catch((e) => {
                if( e.response.status == 401 ) {
                    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)

                    this.errorMessage = 'The password you entered is incorrect.'
                    this.errorSnackbar = true

                    this.login.password = ''
                    this.$v.login.password.$touch()
                }
                
                if( e.response.status >= 500 ){
                    console.log('Network error.')
                    this.$router.push('/error')
                    this.$nuxt.error({ message: 'Network Error', statusCode: e.response.status })

                }
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
