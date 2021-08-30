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
                            :user="$auth.user"
                            size="34" 
                        />

                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        :to="{ name: 'user-url', params: { url: $auth.user.custom_url } }"
                        @click="() => {}"
                        >
                        <v-list-item-title>
                            Profile
                        </v-list-item-title>
                        </v-list-item>

                        <v-list-item
                        @click="() => {}"
                        >
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

        <v-overlay 
            opacity="1"
            color="#0e0e0e" 
            :value="isPageLoading"
        >
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
</v-app-bar>

</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        isOffline() {
            return this.$nuxt.isOffline;
        },
        ...mapState(['isPageLoading'])
    },
    created() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)

      if( this.$auth.loggedIn && !this.$auth.user.custom_url ) {
        this.logout()
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

        this.$auth.logout()
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