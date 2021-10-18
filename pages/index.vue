<template>
  <div></div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['isPageLoading']),
    ...mapGetters({
      isLoggedIn: 'firebaseAuth/GET_IS_LOGGED_IN'
    })
  },
  mounted() {
    this.checkAuth()    
  },
  methods: {
    checkAuth() {
      setTimeout(() => {
        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)

        if( this.isLoggedIn ) {
          location.href = '/newsfeed'
          // this.$router.push({name: 'newsfeed'})
        }else {
          this.$router.push({name: 'login'})
        }
      }, 0)
    }
  }

}
</script>
