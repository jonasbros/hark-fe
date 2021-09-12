<template>
    <v-card
        class="mx-auto mb-15"
        max-width="100%"
    >
        <v-img
        v-if="post.upload_url"
        :src="post.upload_url"
        height="200px"
        ></v-img>

        <v-card-title>
            {{ post.title }}
        </v-card-title>

        <v-card-subtitle class="text--primary">
            {{ post.display_name }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            {{ post.body }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-space-around">

            <v-btn
                color="primary"
                text
                :ripple="false"
            >
                Like
            </v-btn>

            <v-btn
                color="primary"
                text
                :ripple="false"                
            >
                Comment
            </v-btn>

            <v-btn
                color="primary"
                text
                plain
                :ripple="false"
            >
                Share
            </v-btn>
            
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false
        }
    }
}
</script>

<style>

</style>