<template>
    <v-app-bar
        fixed
        app
        color="hark_black"
        class="text-uppercase"
    >

        <v-toolbar-title 
            class="ml-6 font-weight-bold"
            color="primary"
            to="/"
        >
            <NuxtLink to="/">HARK</NuxtLink>
        </v-toolbar-title>

        <v-spacer />

        <NuxtLink
            class="mr-4 font-weight-bold white--text"
            to="/signup"
        >
        Sign Up
        </NuxtLink>

        <NuxtLink 
            class="mr-6 font-weight-bold white--text"
            to="/login"
        >
        Log In
        </NuxtLink>
    
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>