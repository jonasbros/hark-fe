<template>
  <v-row>
    <v-col class="col-6">
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
    async asyncData({ app, params, $auth, store }) {
      store.dispatch('UPDATE_IS_PAGE_LOADING', true)

      const url = params.url
      let user = null;

      if( url != $auth.user.custom_url ) {
        user = await store.dispatch('user/FETCH_USER', url)
      }else {
        user = $auth.user
      }
      
      store.dispatch('UPDATE_IS_PAGE_LOADING', false)

      return { user }
    },
    created () {

      if( this.user == 404 ) {
        this.$nuxt.error({ message: 'Hello', statusCode: 404 })
      }
    },
}
</script>

<style>

</style>