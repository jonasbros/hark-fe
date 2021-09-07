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
import { mapState } from 'vuex';

export default {
    middleware: 'auth',
    computed: {
      user() {
        return this.$auth.user;
      },
      ...mapState(['isPageLoading'])
    },
    created() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
    }
}
</script>

<style lang="scss">
  .hark-center {
    border-left: 1px solid $hark-black;
    border-right: 1px solid $hark-black;
    min-height: calc(100vh - 64px);
    padding: 0 !important;
    background-color: $hark-black;
  }
  
</style>