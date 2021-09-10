<template>
    <BaseDialog v-model="showNewPost" @clickedOutside="closeEmojiPicker" @closedDialog="closedDialog"> 
        <template v-slot:btnlabel>What's on your mind?</template>
        <template v-slot:title>What's on your mind?</template>
        
        <template v-slot:content>
            <v-textarea
                outlined
                :no-resize="true"
                name="user_new_post"
                label="What's on your mind?"
                v-model="postContent"
            ></v-textarea> 
                
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
        showNewPost: false,
        renderEmojiPicker: true,
        showEmojiPicker: false,
    }),
    methods: {
        closedDialog() {
            this.postContent = ''
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