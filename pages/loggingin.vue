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
            const userInfo = {...this.$auth.user, token: this.accessToken}

            let response = await this.$axios.post(process.env.loginGoogleEndpoint, userInfo)

            let status = response.data.status

            if( status == 'success' ) {
                this.getLoginGoogleUser();
            }else {
                this.$nuxt.error({ message: response.data.message })
            }

        },
        async getLoginGoogleUser() {
            let user = await this.$axios.post(process.env.loginGoogleUserInfoEndpoint, { access_token: this.accessToken })

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