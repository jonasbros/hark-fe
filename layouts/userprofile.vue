<template>
    <v-app id="infinite-scroll-target"> 
        <AuthNavbar v-if="user" :user="user"/>
        <BaseNavbar v-else />

        <v-main>
            <v-row class="justify-center">

                <LeftSidebar/>
                
                <v-col class="hark-center col-6">
                  <v-container>
                      <v-row>
                          <v-col class="col-12 pt-6">
                              <UserProfileHeader
                                v-if="user"
                                :user="user"
                              />
                          </v-col>
                      </v-row>

                      <v-row>
                          <v-col class="col-12 pt-6">
                              <Nuxt v-if="user"/>
                          </v-col>
                      </v-row>
                  </v-container>
                </v-col>

                <RightSidebar />
            </v-row>

        </v-main>

        <v-overlay 
          opacity="1"
          color="hark_black" 
          :value="isPageLoading"
        >
          <v-progress-circular
              indeterminate
              size="64"
          ></v-progress-circular>
        </v-overlay>
    </v-app>

</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
      return {
        user: null,
      }
    },
    watch: {
      // runs fetch() again to refresh user profile
      '$route.params.url': function(ov, nv) {
        this.refresh()
      },
    },
    computed: {
      ...mapState(['isPageLoading', 'firebaseAuth']),
    },

    async fetch() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)
    },

    async created() {
      //get user profile info,
      try {
        let getUser = await this.$store.dispatch('user/GET_CURRENT_PROFILE_OWNER', this.$route.params.url)
        this.user = getUser.user

        this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
      }catch(e) {
        console.log(e)
        this.$nuxt.error({ message: e, statusCode: 404 })
      }
    },

    methods: {
      refresh() {
        this.$fetch()
      },
    }
}
</script>

<style>

</style>