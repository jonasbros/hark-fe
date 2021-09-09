<template>
    
</template>

<script>
export default {
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
            const userInfo = {...this.$auth.user, password: this.$auth.user.sub , token: this.accessToken}
            try {
                let response = await this.$axios.post(process.env.loginGoogleEndpoint, userInfo)

                let newToken = await response.data.access_token
                if( newToken ) {
                    this.$auth.strategy.token.set(newToken)
                    this.getLoginGoogleUser();
                }
            }catch(e) {
                this.$nuxt.error({ message: e })
            }

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