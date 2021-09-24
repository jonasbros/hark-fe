<template>
  <v-app>
    <AuthNavbar :user="user"/>

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
    // middleware: 'auth',
    computed: {
      user() {
        return JSON.parse(localStorage.getItem('authUserInfo')).firebaseAuth.authUserInfo
      },
      ...mapState(['isPageLoading', 'firebaseAuth'])
    },
    created() {
        this.checkUserAuth()
        console.log(localStorage.getItem('userAuthInfo'))
    },
    methods: {
      checkUserAuth() {
        
        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
      }
    }
}
</script>

<style lang="scss">

</style>