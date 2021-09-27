<template>
    <article>
        <v-skeleton-loader
            v-if="$fetchState.pending"
            class='mb-6'
            :boilerplate="true"
            elevation="2"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>

        <v-card
            v-else-if="Object.keys(post).length"
            class="mx-auto mb-8"
            max-width="100%"
        >
            <v-img
                v-if="post.upload_url"
                :src="post.upload_url"
                min-height="200px"
                max-height="280px"
                :contain="false"
            ></v-img>

            <v-card-title v-if="post.title">
                {{ post.title }}
            </v-card-title>

            <v-card-title class="text--primary font-weight-bold text-subtitle-1">
                {{ post.display_name }}
            </v-card-title>

            <v-card-subtitle v-if="post.created_at">
                {{ post.created_at | dateFormat }}
            </v-card-subtitle>

            <v-card-text class="text--primary text-subtitle-1">
                {{ post.body }}
            </v-card-text>

            <v-card-subtitle>
                {{ likes }} likes
            </v-card-subtitle>

            <v-divider v-if="$store.state.firebaseAuth.authToken"></v-divider>

            <v-card-actions class="justify-space-around" v-if="$store.state.firebaseAuth.authToken">

                <v-btn
                    :class="{'font-weight-bold': isAuthLiked}"
                    :color="isAuthLiked ? 'primary' : 'secondary'"
                    text
                    plain
                    :ripple="false"
                    @click="likeOrUnlike"
                >
                    Like
                </v-btn>

                <v-btn
                    color="secondary"
                    text
                    plain
                    :ripple="false"            
                    @click="showCommentInput = !showCommentInput"    
                >
                    Comment
                </v-btn>

                <v-btn
                    color="secondary"
                    text
                    plain
                    :ripple="false"
                >
                    Share
                </v-btn>
                
            </v-card-actions>

            <v-divider v-if="$store.state.firebaseAuth.authToken && showCommentInput"></v-divider>

            <div class="px-5 pt-7 pb-5" v-show="showCommentInput">
                <PostComment/>
            </div>            
        </v-card>

    </article>
    
</template>

<script>
import * as Cookies from 'js-cookie';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false,
            likes: 0,
            isAuthLiked: false,
            showCommentInput: false
        }
    },
    async fetch() {
        await this.getCurrentLikes()
    },
    fetchOnServer: false,
    methods: {
        likeOrUnlike() {
            if( !this.isAuthLiked ) {
                this.like()
                return
            }

            this.unlike()
        },

        like() {
            this.$axios.post(`/api/likeUserPost`, { postId: this.post.id })
            .then((response) => {
                if( response.data.status == 'success' ) {
                    this.likes++
                    this.isAuthLiked = true
                }
            })
            .catch((e) => {
                console.log(e)
            })
        },

        unlike() {
            this.$axios.post(`/api/unlikeUserPost`, { postId: this.post.id })
            .then((response) => {
                if( response.data.status == 'success' ) {
                    this.likes--
                    this.isAuthLiked = false
                }
            })
            .catch((e) => {
                console.log(e)
            })
        },

        async getCurrentLikes() {
            let userCookie = JSON.parse(Cookies.get('user'))
            let userId = this.$store.firebaseAuth ? this.$store.firebaseAuth.authUserInfo.id : userCookie.firebaseAuth.authUserInfo.id

            try {
                let likes = await this.$axios.post(`/api/getUserPostLikes`, { postId: this.post.id, userId })
                
                if( likes ) {
                    this.likes += await likes.data.likes
                    
                    if( likes.data.userLiked ) {
                        this.isAuthLiked = true
                    }
                }

            
            }catch(e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="scss">
    .v-dialog{
        overflow: visible !important;
    }
</style>