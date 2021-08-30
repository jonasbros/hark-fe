<template>
  <v-app>
    <AuthNavBar :user="user"/>

    <v-main>
      <v-row class="justify-center">
        <LeftSidebar/>
        
        <v-col class="hark-center col-6">
          <v-container>
            <Nuxt/>
          </v-container>
        </v-col>

        <RightSidebar/>
      </v-row>

    </v-main>
  </v-app>
</template>

<script>
export default {
    middleware: 'auth',
}
</script>

<style lang="scss">
  .hark-center {
    border-left: 1px solid $hark-black;
    border-right: 1px solid $hark-black;
    min-height: calc(100vh - 64px);
    padding: 0 !important;
    background-color: $hark-black;
  }
  
</style>