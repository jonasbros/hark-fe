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

                <div class="hark-comment__content__footer">
                    <v-btn
                        class="font-weight-bold"
                        color="secondary"
                        text
                        plain
                        x-small
                        :ripple="false"
                        @click="like"
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
    data: () => ({
        likes: 0,
        isUserLiked: false,
    }),
    methods: {
        like() {
            this.$axios.post(`/api/likeUserPostComment`, { postId: this.postId })
            .then((response) => {
                if( response.data.status == 'success' ) {
                    this.likes++
                    this.isUserLiked = true
                }
            })
            .catch((e) => {
                console.log(e)
            })
        }
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
</style>