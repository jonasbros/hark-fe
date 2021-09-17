<template>
  <v-row class="justify-center">
    <v-col
      cols="8"
      v-if="userIsMe"
    >
      <NewPost 
        @newPostAdded="insertNewPost" 
        @newPostLoading="skeletonLoader = true"
      />
    </v-col>
    
    <v-col 
      v-if="$fetchState.pending || skeletonLoader"
      cols="8"
    >
        <v-skeleton-loader
          class='mb-6'
          :boilerplate="true"
          elevation="2"
          type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>
    </v-col>

    <v-col 
      class="posts" 
      v-if="posts.length"
      cols="8"
    >
      <BasePost 
        v-for="post in posts" :key="post.id * 322" 
        :post="post"
      />
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
      posts: [],
      skeletonLoader: false,
      fetchingPosts: false,
      postsPage: 1,
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
    fetchOnServer: false,

    mounted() {
      window.onscroll = (e) => {
        this.getNextPage(e)
      }

      this.renderEmojiPicker = true
    },

    methods: {
      insertNewPost(post) {
        this.skeletonLoader = false

        this.posts.unshift(post)
      },

      async getPosts() {
        this.fetchingPosts = true

        this.$axios.get(`/api/getposts/${this.url}?page=${this.postsPage}&perPage=${process.env.postsPerPage}`)
        .then(({ data }) => {
          this.posts.push(...data.posts.data) 
          this.fetchingPosts = false
        })
        .catch((e) => {
          console.log(e)
        })


      },
      
      getNextPage(e) {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight

          if (bottomOfWindow && !this.fetchingPosts) {
            this.postsPage++

            this.getPosts()
          }
      }
        
    }
}
</script>

<style lang="scss">

</style>