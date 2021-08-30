<template>
    <v-app> 
        <AuthNavBar :user="user"/>

        <v-main>
            <v-row class="justify-center">

                <LeftSidebar/>
                
                <v-col class="hark-center col-6">
                <v-container>
                    <v-row>
                        <v-col class="col-12 pt-6">
                            <UserProfileHeader v-if="user" :user="user"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="col-12 pt-6">
                            <Nuxt/>
                        </v-col>
                    </v-row>
                </v-container>
                </v-col>

                <RightSidebar/>
            </v-row>

        </v-main>
    </v-app>

</template>

<script>
export default {
    middleware: 'auth',
    data() {
      return {
        user: null,
      }
    },
    computed: {
      userIsMe() {
        const url = this.$route.params.url
        return url == this.$auth.user.custom_url
      },
      userUrl() {
        return (this.userIsMe ? this.$auth.user.custom_url : this.$route.params.url)
      }

    },
    async fetch() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

      if( this.userIsMe ) {
          this.user = this.$auth.user
      }else {
        this.user = await this.$store.dispatch('user/FETCH_USER', this.userUrl)

        if( this.user == 404 ) {
          this.$nuxt.error({ message: 'User Not Found', statusCode: 404 })
        }
      }
      
      console.log(this.user);
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
    },
}
</script>

<style>

</style>