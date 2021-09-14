<template>
    
</template>

<script>
export default {
    data: () => ({
        login: {
            email: null,
            password: null
        }
    }),
    computed: {
        accessToken() {
            return this.$auth.strategy.token.get();
        }
    },
    created() {
        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)
        if( this.$auth.loggedIn && this.$auth.strategy.name == 'google' && this.accessToken ) {
            this.saveUserToDB()
        }
    },
    methods: {
        async saveUserToDB() {
            this.login.email = this.$auth.user.email
            this.login.password = this.$auth.user.sub

            const userInfo = {...this.$auth.user, password: this.$auth.user.sub , token: this.accessToken}
            try {
                let response = await this.$axios.post(process.env.loginGoogleEndpoint, userInfo)

                if( response.data.status == 'success' ) {
                    this.toJWT()
                }
            }catch(e) {
                this.$nuxt.error({ message: e })
            }

        },
        // hacky 
        // re logging in to laravelJWT because the google one wont persist after reload. can't find fix yet sadge
        async toJWT() {
            this.$auth.loginWith('laravelJWT', { data: this.login })
            .then((response) => {
                console.log(response)
                if( response.data.access_token ) {
                    this.getLoginGoogleUser()

                    this.login.email = null
                    this.login.password = null
                }
            })
            .catch((e) => {
                console.log(e)
            })
        },
        
        async getLoginGoogleUser() {
            try{
                let user = await this.$axios.post(process.env.loginGoogleUserInfoEndpoint)
                this.$auth.setUser(await user.data)
                this.$router.push({ name: 'newsfeed' })
            }catch(e) {
                this.$nuxt.error({ message: e })
            }
        },
    }
}
</script>

<style>

</style>