<template>
    <v-app-bar
        flat
        color="hark_black"
        class="hark-navbar text-uppercase"
    >
        <v-btn 
        text
        plain
        nuxt
        color="secondary"
        v-for="(item, i) in menuItems"
        :key="item.name + i"
        :to="{ name: item.urlName, params: { url: userId } }"
        >
        {{ item.name }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn 
            text
            plain
            nuxt
            color="secondary"
            v-for="(item, i) in menuItems2"
            :key="item.name + i"
            :to="{ name: item.urlName, params: { url: userId } }"
        >
        {{ item.name }}
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            menuItems: [
                {
                    name: 'Posts',
                    urlName: 'user-url',
                },
                {
                    name: 'About',
                    urlName: 'user-url-about'
                },
                {
                    name: 'Media',
                    urlName: 'user-url-media'
                },
                {
                    name: 'Friends',
                    urlName: 'user-url-friends'
                },
            ],
            menuItems2: [
                {
                    name: 'Settings',
                    urlName: 'user-url-settings',
                },
                {
                    name: 'Edit Profile',
                    urlName: 'user-url-editprofile'
                },
            ],
            userId: null,
        }
    },
    created() {
        this.userId = this.user.custom_url
    }

}
</script>

<style>

</style>