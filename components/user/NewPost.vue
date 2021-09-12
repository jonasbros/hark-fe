<template>
    <BaseDialog @clickedOutside="closeEmojiPicker" @closedDialog="closedDialog"> 
        <template v-slot:btnlabel>What's on your mind?</template>
        <template v-slot:title>New post</template>
        
        <template v-slot:content>
            <form @enter.prevent="return false" @submit.prevent="post" ref="newPostForm" method="post">
                <BaseTextarea
                    ref="newPostTextarea"
                    color="secondary"
                    label="What's on your mind?"
                    errorMessage="Post is empty :("
                    v-model="postContent"
                />
                    
                <v-btn
                    class="newpost-included"
                    id="emoji-picker-btn"
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
                        class="newpost-included"
                        v-show="showEmojiPicker"
                        @select="selectEmoji" 
                        :dark="true"  
                    />
                </div>

                <button ref="newPostSubmitBtn" type="submit" class="d-none">Submit</button>
            </form>
        </template>

        <template v-slot:actionbtns>
            <v-btn
                color="primary"
                text
                :ripple="false"
                @click="$refs.newPostSubmitBtn.click()"
            >
                Post!
            </v-btn>
        </template>
    </BaseDialog>
</template>

<script>
import { VEmojiPicker, emojisDefault, categoriesDefault } from 'v-emoji-picker';

export default {
    components: {
      VEmojiPicker,
    },
    data: () => ({
        postContent: '',
        renderEmojiPicker: true,
        showEmojiPicker: false,
    }),
    methods: {
        async post() {
            if( this.postContent == '' ) return
            this.$emit('newPostLoading')
            
            this.$axios.post(`/api/submitpost`, { postContent: this.postContent })
            .then((response) => {

                this.$emit('newPostAdded', response.data.post[0])

                document.querySelector('#dialog-activator').click()
                this.postContent = ''
                this.$refs.newPostTextarea.undirty()
            })
            .catch((e) => {
                console.log(e)
            })
        },
        closedDialog(status) {
            if( status ) return
            this.$refs.newPostTextarea.undirty()
        },
        closeEmojiPicker() {
            this.showEmojiPicker = false
        },
        toggleEmojiPicker(e) {
            this.showEmojiPicker = !this.showEmojiPicker
        },
        selectEmoji(emoji) {
            this.postContent = this.postContent + ' ' + emoji.data
            this.showEmojiPicker = false;
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