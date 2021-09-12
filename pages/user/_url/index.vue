<template>
  <v-row class="justify-center">
    <v-col
      cols="8"
      v-if="userIsMe"
    >
      <NewPost/>
    </v-col>
    
    <v-col 
      v-if="$fetchState.pending"
      cols="8"
    >
        <v-skeleton-loader
          class='mb-6'
          boilerplate="true"
          elevation="2"
          type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>
    </v-col>

    <v-col 
      class="posts" 
      v-if="posts.length"
      cols="8"
    >
      <BasePost v-for="post in posts" :key="post.id" :post="post"/>
    </v-col>

    <v-col 
      v-else-if="!posts.length && !$fetchState.pending"
      class="text-center"
      cols="8"
    >
      <h3>{{ noPosts }}</h3>
    </v-col>

  </v-row>
</template>

<script>

export default {
    layout: 'userprofile',
    data: () => ({
      posts: []
    }),
    computed: {
      url() {
        return this.$route.params.url
      },
      customUrl() {
        return (this.$auth.user ? this.$auth.user.custom_url : null)
      },
      userIsMe() {
        return this.$route.params.url == this.customUrl
      },
      noPosts() {
        return ( this.userIsMe ? 'It looks like you don\'t have posts yet.' : 'No posts to display.')
      }
    },
    async fetch() {
      await this.getPosts()
    },
    mounted() {
      this.renderEmojiPicker = true
    },
    methods: {
      async getPosts() {
        let posts = await this.$axios.get(`/api/getposts/${this.url}/${process.env.postsPerPage}`)
        this.posts = await posts.data.posts
      }        
        
    }
}
</script>

<style lang="scss">

</style>