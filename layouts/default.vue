<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="#0e0e0e"
      class="text-uppercase"
    >
      <v-toolbar-title 
        class="ml-6 font-weight-bold"
        color="#00FF78"
        to="/"
      >
        <NuxtLink to="/">HARK</NuxtLink>
      </v-toolbar-title>
      <v-spacer />
      <NuxtLink
        class="mr-4 font-weight-bold"
        to="/signup"
      >
        Sign Up
      </NuxtLink>
      <NuxtLink 
        class="mr-6 font-weight-bold"
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

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: 'HARK',
      overlay: false,
    }
  },
  created() {
    this.$nuxt.$on('isPageLoading', (isPageLoading) => {
      this.overlay = isPageLoading;
    });
  }

}
</script>

<style lang="scss" scoped>

</style>