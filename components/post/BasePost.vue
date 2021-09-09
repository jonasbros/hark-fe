<template>
    <v-card
        class="mx-auto mb-15"
        max-width="100%"
    >
        <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
        ></v-img>

        <v-card-title>
            {{ post.title }}
        </v-card-title>

        <v-card-subtitle>
        1,000 miles of wonder
        </v-card-subtitle>

        <v-card-actions>
        <v-btn
            color="orange lighten-2"
            text
        >
            Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            icon
            @click="show = !show"
        >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        </v-card-actions>

        <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
                {{ post.body }}
            </v-card-text>
        </div>
        </v-expand-transition>
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