<template>
    <v-img
        style="cursor: pointer"
        lazy-src="/google.png"
        max-height="35"
        max-width="180"
        src="/google.png"
        @click="loginWithGoogle"
    ></v-img>
</template>

<script>
export default {
    methods: {
        loginWithGoogle() {
            this.$auth.loginWith('google')
        },
    }
}
</script>

<style>

</style>