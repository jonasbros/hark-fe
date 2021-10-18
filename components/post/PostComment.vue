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
                    @BaseTextAreaSubmit="post"
                    @BaseTextAreaNewLine="addNewLine"
                    v-model="commentContent"
                />
            </template>

        </BasePostInput>
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

            if( !this.commentContent.replace(/[\n\r\t]/g, "") || !this.commentContent ) return
            this.$emit('newCommentLoading')


            this.$axios.post(`/api/submitUserBasePostComment`, { postId: this.postId, commentContent: this.commentContent })
            .then((response) => {
                this.commentContent = ''
                this.$refs.newPostTextarea.undirty()
                this.$refs.newPostTextarea.blur()
                this.$emit('newCommentAdded', response.data.comment[0])
            })
            .catch((e) => {
                console.log(e)
            })
        },

        addNewLine() {
            this.commentContent += '\n'
        }
    }
}
</script>

<style>

</style>