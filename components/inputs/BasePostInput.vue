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
        renderEmojiPicker: true,
        showEmojiPicker: false,
    }),
    methods: {
        closeEmojiPicker() {
            this.showEmojiPicker = false
        },
        toggleEmojiPicker(e) {
            this.showEmojiPicker = !this.showEmojiPicker
        },
        selectEmoji(emoji) {
            this.$emit('selectEmoji', emoji.data)
            this.showEmojiPicker = false;
        },
        enterPrevent() {
            return false
        }
    }
}
</script>

<style>

</style>