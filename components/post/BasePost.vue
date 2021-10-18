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

            <div class="d-flex align-center">
                <UserAvatar 
                    class="pa-3"
                    size="48"
                    :user="{
                        display_name: post.display_name,
                        profile_picture: post.profile_picture
                    }"
                />

                <div class="d-inline-block">
                    <v-card-title class="text--primary font-weight-bold text-subtitle-1 pl-0">
                        {{ post.display_name }}
                    </v-card-title>

                    <v-card-subtitle v-if="post.created_at" class="pl-0">
                        {{ post.created_at | dateFormat }}
                    </v-card-subtitle>
                </div>
            </div>

            <v-card-text class="text--primary text-subtitle-1">
                <div class="hark__content-body">{{ post.body }}</div>
            </v-card-text>

            <v-card-subtitle>
                <span class="mr-2">{{ likes }} likes</span>
                <span 
                    class="hark__comments-counter"
                    @click="showCommentInput = !showCommentInput"
                >
                    {{ commentsCount }} comments
                </span> 
            </v-card-subtitle>

            <v-divider v-if="$store.state.firebaseAuth.authToken"></v-divider>

            <v-card-actions class="justify-space-around" v-if="$store.state.firebaseAuth.authToken">

                <v-btn
                    :class="{'font-weight-bold': isUserLiked}"
                    :color="isUserLiked ? 'primary' : 'secondary'"
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
          
            <div class="px-3 pt-5 pb-0" v-show="showCommentInput">
                <PostComment 
                    :postId="post.id" 
                    @newCommentAdded="insertNewComment"
                    @newCommentLoading="skeletonLoader = true"
                />
            </div>             

            <v-divider v-if="$store.state.firebaseAuth.authToken && showCommentInput"></v-divider>

            <div class="px-2 pt-4 pb-3" v-show="showCommentInput">
                <v-skeleton-loader
                    v-show="skeletonLoader"
                    class='mb-6'
                    :boilerplate="true"
                    elevation="2"
                    type="list-item-avatar, divider, list-item-three-line, actions"
                ></v-skeleton-loader>

                <BaseComment 
                    v-for="comment in comments" 
                    :key="'comment' + comment.id"
                    :comment="comment" 
                    :postId="post.id"
                />

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
            likes: 0,
            isUserLiked: false,
            showCommentInput: false,
            comments: [],
            skeletonLoader: false,
            fetchingComments: false,
            commentsPage: 1,
            commentsCount: 0,
        }
    },
    async fetch() {
        await this.getCurrentLikes()
        await this.getComments()

    },
    fetchOnServer: false,
    methods: {
        insertNewComment(comment) {
            this.skeletonLoader = false

            this.comments.unshift(comment)
        },

        getComments() {
            this.fetchingComments = true

            this.$axios.get(`/api/getPostComments?postId=${this.post.id}&page=${this.commentsPage}&perPage=${process.env.commentsPerPage}`)
            .then(({ data }) => {
                this.comments.push(...data.comments.data) 
                this.commentsCount = data.count
                this.fetchingComments = false
            })
            .catch((e) => {
                console.log(e)
            })
        },

        likeOrUnlike() {
            if( !this.isUserLiked ) {
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
                    this.isUserLiked = true
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
                    this.isUserLiked = false
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
                        this.isUserLiked = true
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

    .hark__comments-counter {
        cursor: pointer;
    }
</style>