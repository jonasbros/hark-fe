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
                    this.$auth.strategy.token.set(newToken);
                    this.getLoginGoogleUser();
                }
            }catch(e) {
                this.$nuxt.error({ message: e })
            }


            if( status == 'success' ) {
                this.getLoginGoogleUser();
            }else {
            }

        },
        async getLoginGoogleUser() {
            let user = await this.$axios.post(process.env.loginGoogleUserInfoEndpoint)

            if( user.data.custom_url ) {
                this.$auth.setUser(user.data)
                this.$router.push({ name: 'newsfeed' })
            }else {
                this.$nuxt.error({ message: response.data.message })
            }
        },
    }
}
</script>

<style>

</style>