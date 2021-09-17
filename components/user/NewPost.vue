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
    }),
    methods: {
        async post() {
            if( this.postContent == '' ) return
            this.$emit('newPostLoading')
            
            this.$axios.post(`/api/submituserbasepost`, { postContent: this.postContent })
            .then((response) => {
                this.$emit('newPostAdded', response.data.post[0])
                this.clearTextArea()
            })
            .catch((e) => {
                console.log(e)
            })
        },
        
        appendEmoji(emoji) {
            this.postContent = this.postContent + emoji
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
        }
    }
}
</script>

<style lang="scss">
    .base-dialog {
        overflow: visible !important;
    }

    #dialog-content {
        position: relative;
        padding: 1em;
    }
    
    #emoji-picker-btn {
        position: absolute;
        right: 1.75em;
        bottom: 22%;
    }

    #EmojiPicker {
        position: absolute;
        z-index: 99;
        right: 3.75em;
        top: -20%;
    }
</style>