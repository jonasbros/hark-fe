<template>
  <v-container>
    <BaseNavbar v-if="!isLoggedIn"/>

    <h1>
      {{ pageNotFound }}
    </h1>
    <h2>
      {{ errorMessage }}
    </h2>
    <NuxtLink to="/">
      Home page
    </NuxtLink>

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
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  layout: 'newsfeed',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: this.error.statusCode,
      errorMessage: this.error.message
    }
  },
  computed: {
    ...mapState(['isPageLoading', 'firebaseAuth']),
    ...mapGetters({
        isLoggedIn: 'firebaseAuth/GET_IS_LOGGED_IN'
    })
  },
  created() {
    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

    if( !this.isLoggedIn ) {
      this.$nuxt.setLayout('default')
    }
  },
  mounted() {
    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
