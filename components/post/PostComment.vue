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
    data: () => ({
        commentContent: ''
    }),
    methods: {
        appendEmoji(emoji) {
            this.commentContent = this.commentContent + emoji
        },
        post() {
            console.log('post')
        }
    }
}
</script>

<style>

</style>