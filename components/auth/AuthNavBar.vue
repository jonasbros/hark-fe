<template>
    <v-app-bar
        fixed
        app
        color="hark_black"
        class="hark-navbar text-uppercase"
    >
        <v-toolbar-title 
            class="ml-6 font-weight-bold"
            color="primary"
            to="/"
        >
        <NuxtLink to="/newsfeed">HARK</NuxtLink>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        
        <div class="hark-navbar__items-container ml-5 d-flex justify-space-between align-center">
            <v-text-field
                class="hark-navbar__search"
                solo
                dense
                hide-details="auto"
                label="Search Hark"
                prepend-inner-icon="mdi-magnify"
            ></v-text-field>


            <div class="d-flex justify-end align-center">
                <v-btn 
                    icon
                    color="secondary"
                >
                    <v-icon>mdi-message-text-outline</v-icon>
                </v-btn>

                <v-btn
                    icon
                    color="secondary"
                >
                    <v-icon>mdi-bell</v-icon>
                </v-btn>

                <v-menu
                    left
                    bottom
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                        <UserAvatar 
                            v-if="!!user"
                            :user="user"
                            size="34" 
                        />

                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-if="!!user"
                            :to="{ name: 'user-url', params: { url: user.custom_url } }"
                            @click="() => {}"
                        >
                            <v-list-item-title>
                                Profile
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item>

                        <v-list-item
                            @click="logout"
                        >
                            <v-list-item-title>Log out</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <v-snackbar
                color="error"
                v-model="isOffline"
            >
                You are offline.

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="accent"
                        text
                        v-bind="attrs"
                        @click="isOffline = false"
                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
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
    computed: {
        isOffline() {
            return this.$nuxt.isOffline;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

            this.$axios.setHeader('Authorization', '')
            this.$fire.auth.signOut()
            //temporary solution. router.push() / changing route crashes after signout 
            location.href = '/login'
        },
 
    }
}
</script>

<style lang="scss">
  .hark-navbar__items-container {
    width: 90%;
  }

  .hark-navbar__search .v-input__slot {
    width: 30%;
  }
  
  .hark-navbar .v-input, .hark-navbar .v-toolbar {
    padding-top: 0;
    margin-top: 0;
  }

</style>