<template>
  <v-row>
    <v-col class="col-12">
      <UserProfileHeader :user="user"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
    layout: 'authenticated',
    data() {
      return {
        user: null,
      }
    },
    computed: {
      userIsMe() {
        const url = this.$route.params.url
        return url == this.$auth.user.custom_url
      }
    },
    async fetch() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)


      if( this.userIsMe ) {
          this.user = this.$auth.user
      }else {
        this.user = await this.$store.dispatch('user/FETCH_USER', url)

        if( this.user == 404 ) {
          this.$nuxt.error({ message: 'User Not Found', statusCode: 404 })
        }
      }
      
      console.log(this.user);
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
    },
}
</script>

<style>

</style>