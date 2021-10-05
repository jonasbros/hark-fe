<template>
  <v-app>
    <AuthNavBar :user="user"/>

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
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
      ...mapState(['isPageLoading']),
      ...mapGetters({
        user: 'firebaseAuth/GET_USER_INFO',
        isLoggedIn: 'firebaseAuth/GET_IS_LOGGED_IN'
      })
    },
    created() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)
    },
    mounted() {
      this.checkUserAuth()
    },
    methods: {
      checkUserAuth() {
        if( !this.isLoggedIn ) { this.logout(); return; }        

        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
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