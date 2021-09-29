<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'firebaseAuth/GET_IS_LOGGED_IN'
    })
  },
  mounted() {
    if( this.isLoggedIn ) {
      this.$router.push({name: 'newsfeed'})
    }else {
      this.$router.push({name: 'login'})
    }
    
  }
}
</script>
