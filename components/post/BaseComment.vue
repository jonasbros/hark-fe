<template>
    <article class="hark-comment mb-5">
        <div class="hark-comment__content d-flex flex-row">
            <UserAvatar 
                class="pa-3"
                size="42"
                :user="{
                    display_name: comment.display_name,
                    profile_picture: comment.profile_picture
                }"
            />

            <div class="hark-comment__content__body my-2 light_grey py-1 px-3">
                <p class="ma-0">{{ comment.display_name }}</p>
                <p class="hark__content-body ma-0">{{ comment.body }}</p>


                <v-chip
                    v-if="likes"
                    class="hark-comment__likes-count px-2"
                    color="light_grey"
                    text-color="primary"
                    small
                    >
                        <v-avatar 
                            left 
                            class="ma-0"
                        >
                            <v-icon>
                                mdi-thumb-up
                            </v-icon>
                        </v-avatar>
                        {{likes}}
                </v-chip>

                <div class="hark-comment__content__footer">
                    <v-btn
                        :class="{'font-weight-bold': isUserLiked}"
                        :color="isUserLiked ? 'primary' : 'secondary'"
                        text
                        plain
                        x-small
                        :ripple="false"
                        @click="likeOrUnlike"
                    >
                        Like
                    </v-btn>

                    <v-btn
                        color="secondary"
                        text
                        plain
                        x-small
                        :ripple="false"            
                    >
                        Reply
                    </v-btn>
                    
                    <small>
                        {{ comment.created_at | dateFormatFromNow }}
                    </small>
                </div>
            </div>
        </div>



    </article>
</template>

<script>
export default {
    props: {
        postId: {
            type: Number | String,
            required: true
        },
        comment: {
            type: Object,
            required: true
        }
    },
    fetchOnServer: false,
    data: () => ({
        likes: 0,
        isUserLiked: false,
    }),
    async fetch() {
        this.isUserLiked = this.comment.userLiked
        this.likes = this.comment.likes.length
    },
    methods: {
        likeOrUnlike() {
            if( !this.isUserLiked ) {
                this.like()
                return
            }

            this.unlike()
        },

        like() {
            this.$axios.post(`/api/likeUserPostComment`, { postId: this.postId, commentId: this.comment.id })
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
            this.$axios.post(`/api/unlikeUserPostComment`, { postId: this.postId, commentId: this.comment.id })
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

    }
}
</script>

<style lang="scss">
    .hark-comment__content__body {
        position: relative;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
    }

    .hark-comment__content__footer {
        position: absolute;
        min-width: 240px;
        left: 0;
        bottom: -22px;
    }

    .hark-comment__likes-count {
        position: absolute !important;
        right: -1em;
        bottom: -0.25em;
    }
</style>