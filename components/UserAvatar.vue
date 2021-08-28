<template>
    <div>
        <v-avatar 
            v-if="user.profile_picture"
            class="profile"
            color="grey"
            :size="size"
        >
            <v-img :src="user.profile_picture"></v-img>
        </v-avatar>

        <v-avatar 
            v-else
            color="primary"
            :size="size"
        >
            <v-icon
                dark
                :size="size"
            >
            mdi-account-circle
            </v-icon>
        </v-avatar>
    </div>         
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: 64
        }
    }
}
</script>

<style>

</style>