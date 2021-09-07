<template>
  <div>
    <h1>SHOW POSTS</h1>
  </div>
</template>

<script>
export default {
    layout: 'userprofile',
    data() {
      return {
        posts: []
      }
    },
    computed: {
      url() {
        return this.$route.params.url
      }
    },
    async fetch() {
      this.getPosts()
    },
    methods: {
      async getPosts() {
        let posts = await this.$axios.get(`/api/getposts/${this.url}`)
        console.log(await posts);
      }
    }
}
</script>

<style>

</style>