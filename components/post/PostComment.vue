<template>
    <div class="d-flex flex-column">
        <BasePostInput 
            ref="newPostForm"
            @selectEmoji="appendEmoji"
            v-model="commentContent" 
        >
            <template v-slot:textarea>
                <BaseTextarea
                    ref="newPostTextarea"
                    color="secondary"
                    label="Post a comment"
                    rows="1"
                    errorMessage="Comment is empty :("
                    v-model="commentContent"
                />
            </template>

        </BasePostInput>

        <v-btn
            class="align-self-end"
            color="primary"
            text
            :ripple="false"
            @click="post"
        >
            Post Comment
        </v-btn>
    </div>

</template>

<script>
export default {
    props: {
        postId: {
            type: String | Number,
            required: true,
        }
    },
    data: () => ({
        commentContent: ''
    }),
    methods: {
        appendEmoji(emoji) {
            this.commentContent = this.commentContent + emoji
        },
        post() {
            this.$refs.newPostTextarea.$v.value.$touch()

            if( this.commentContent == '' ) return
            this.$emit('newCommentLoading')


            this.$axios.post(`/api/getPostComments`, { postId: this.postId, commentContent: this.commentContent })
            .then((response) => {
                console.log(response)
                this.$emit('newCommentAdded', response.data.comment[0])
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style>

</style>