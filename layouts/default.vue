<template>
  <v-app>
    <BaseNavbar />

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
