<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="hark_black"
      class="text-uppercase"
    >
      <v-toolbar-title 
        class="ml-6 font-weight-bold"
        color="primary"
        to="/"
      >
        <NuxtLink to="/">HARK</NuxtLink>
      </v-toolbar-title>
      <v-spacer />
      <NuxtLink
        class="mr-4 font-weight-bold white--text"
        to="/signup"
      >
        Sign Up
      </NuxtLink>
      <NuxtLink 
        class="mr-6 font-weight-bold white--text"
        to="/login"
      >
        Log In
      </NuxtLink>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
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
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: 'HARK',
    }
  },
  computed: {
    ...mapState(['isPageLoading'])
  },
  created() {
    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
  }
}
</script>
