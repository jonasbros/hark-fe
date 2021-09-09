<template>
  <v-row class="justify-center">
    <v-col
      cols="8"
    >
      <v-btn
        small
        depressed
        text
        fab
        :ripple="false"
        color="transparent"
        @click="toggleEmojiPicker()"
      >
        <v-icon 
          color="secondary"
          dark
        >
          mdi-emoticon-happy-outline
        </v-icon>
      </v-btn>

      <div v-if="renderEmojiPicker">
        <VEmojiPicker
          v-show="showEmojiPicker"
          @select="selectEmoji" 
          :dark="true"  
        />
      </div>
    </v-col>
    
    <v-col 
      v-if="$fetchState.pending"
      cols="8"
    >
        <v-skeleton-loader
          v-bind="attrs"
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
      <h3>It looks like you don't have posts yet.</h3>
    </v-col>
  </v-row>
</template>

<script>
import { VEmojiPicker, emojisDefault, categoriesDefault } from 'v-emoji-picker';

export default {
    layout: 'userProfile',
    components: {
      VEmojiPicker,
    },
    data: () => ({
      posts: [],
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
      renderEmojiPicker: false,
      showEmojiPicker: false,
    }),
    computed: {
      url() {
        return this.$route.params.url
      }
    },
    async fetch() {
      await this.getPosts()
    },
    mounted() {
      this.renderEmojiPicker = true
    },
    methods: {
      toggleEmojiPicker(e) {
        this.showEmojiPicker = !this.showEmojiPicker
      },
      selectEmoji(emoji) {
        console.log(emoji)
      },
      async getPosts() {
        let posts = await this.$axios.get(`/api/getposts/${this.url}/${process.env.postsPerPage}`)
        this.posts = await posts.data.posts
      }        
        
    }
}
</script>

<style>

</style>