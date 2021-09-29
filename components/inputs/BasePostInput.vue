<template>
    <form @enter.prevent="enterPrevent()" @submit.prevent="post">
        
        <slot name="textarea"></slot>
            
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
    </form>
</template>

<script>
import { VEmojiPicker, emojisDefault, categoriesDefault } from 'v-emoji-picker';

export default {
    components: {
      VEmojiPicker,
    },
    data: () => ({
        renderEmojiPicker: false,
        showEmojiPicker: false,
    }),
    mounted() {
        this.renderEmojiPicker = true
    },
    methods: {
        closeEmojiPicker() {
            this.showEmojiPicker = false
        },
        toggleEmojiPicker(e) {
            this.showEmojiPicker = !this.showEmojiPicker
        },
        selectEmoji(emoji) {
            this.$emit('selectEmoji', emoji.data)
            this.showEmojiPicker = false
        },
        enterPrevent() {
            return false
        }
    }
}
</script>

<style lang="scss">
    form {
        position: relative;
    }

    #emoji-picker-btn {
        position: absolute;
        right: .75em;
        bottom: 2.75em;
    }

    #EmojiPicker {
        position: absolute;
        z-index: 99;
        right: 3.5em;
        bottom: 2.5em;
    }
</style>