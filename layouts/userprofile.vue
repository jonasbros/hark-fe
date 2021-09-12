<template>
    <v-app> 
        <AuthNavbar v-if="this.$auth.loggedIn" :user="user"/>
        <BaseNavbar v-else :user="user"/>

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
                              <Nuxt/>
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
import { mapState } from 'vuex';

export default {
    data() {
      return {
        user: null,
      }
    },
    watch: {
      // runs fetch() again to refresh user profile
      '$route.params.url': function(oV, nV) {
        this.$fetch()
      }
    },
    computed: {
      customUrl() {
        return (this.$auth.user ? this.$auth.user.custom_url : null)
      },
      userIsMe() {
        return this.$route.params.url == this.customUrl
      },
      userUrl() {
        return (this.userIsMe ? this.customUrl : this.$route.params.url)
      },
      ...mapState(['isPageLoading'])
    },
    async fetch() {
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', true)

      if( this.userIsMe ) {
          this.user = this.$auth.user
      }else {

        try {
          this.user = await this.$store.dispatch('user/GET_CURRENT_PROFILE_OWNER', this.userUrl)
        }catch(e) {
          this.$nuxt.error({ message: e, statusCode: 404 })
        }

      }
      
      this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
    },
    methods: {
      refresh() {
        this.$fetch()
      }
    }
}
</script>

<style>

</style>