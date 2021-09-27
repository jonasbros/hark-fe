<template>
  <v-app>
    <AuthNavbar v-if="user" :user="user"/>

    <v-main>
      <v-row class="justify-center">
        <LeftSidebar/>
        
        <v-col class="hark-center col-6">
          <v-container>
            <Nuxt/>
          </v-container>
        </v-col>

        <RightSidebar/>
      </v-row>

    </v-main>

    <v-overlay 
      opacity="1"
      color="hark_black" 
      :value="isPageLoading"
    >
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data: () => ({
      user: null
    }),
    computed: {
      ...mapState(['isPageLoading'])
    },
    mounted() {
        this.checkUserAuth()
    },
    methods: {
      checkUserAuth() {
        this.user = this.$store.state.firebaseAuth.authUserInfo

        if( this.user ) {
          this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
        }else {
          this.logout()
        }

      },

      logout() {
          this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

          this.$axios.setHeader('Authorization', '')
          this.$fire.auth.signOut()
          //temporary solution. router.push() / changing route crashes after signout 
          location.href = '/login'
      },

    }
}
</script>

<style lang="scss">

</style>