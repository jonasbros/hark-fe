<template>
    <BaseDialog 
        @clickedOutside="closeEmojiPicker" 
        @closedDialog="closedDialog"
    > 
        <template v-slot:btnlabel>What's on your mind?</template>
        <template v-slot:title>New post</template>
        
        <template v-slot:content>
            <BasePostInput 
                ref="newPostForm"
                @selectEmoji="appendEmoji"
                v-model="postContent" 
            >
                <template v-slot:textarea>
                    <BaseTextarea
                        ref="newPostTextarea"
                        color="secondary"
                        label="What's on your mind?"
                        errorMessage="Post is empty :("
                        @BaseTextAreaSubmit="post"
                        @BaseTextAreaNewLine="addNewLine"
                        @setPostCursorPosition="setPostCursorPosition"
                        v-model="postContent"
                    />
                </template>

            </BasePostInput>
        </template>

        <template v-slot:actionbtns>
            <v-btn
                color="primary"
                text
                :ripple="false"
                @click="post"
            >
                Post!
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script>
export default {
    data: () => ({
        postContent: '',
        postCursorPosition: null,
    }),
    methods: {
        async post() {
            this.$refs.newPostTextarea.$v.value.$touch()

            if( this.postContent == '' ) return
            this.$emit('newPostLoading')
            
            this.$axios.post(`/api/submitUserBasePost`, { postContent: this.postContent })
            .then((response) => {
                this.$emit('newPostAdded', response.data.post[0])
                this.clearTextArea()
            })
            .catch((e) => {
                console.log(e)
            })
        },
        
        appendEmoji(emoji) {
            //insert emoji in cursor position
            let a = this.postContent.slice(0, this.postCursorPosition)
            let b = this.postContent.slice(this.postCursorPosition)
            
            this.postContent = [a, emoji, b].join('');
        },

        newPostAdded(newPost) {
            this.$emit('newPostAdded', newPost)
        },

        closedDialog(status) {
            if( status ) return
            this.$refs.newPostTextarea.undirty()
        },

        submitPost() {
            this.$refs.newPostForm.submit()
        },

        closeEmojiPicker() {
            this.$refs.newPostForm.showEmojiPicker = false
        },

        clearTextArea() {                
            document.querySelector('#dialog-activator').click()

            this.postContent = ''
            setTimeout(() => {
                this.$refs.newPostTextarea.undirty()
            })
        },

        setPostCursorPosition(position) {
            this.postCursorPosition = position
        },

        addNewLine() {
            this.postContent += '\n'
        }
    }
}
</script>

<style lang="scss">

</style>