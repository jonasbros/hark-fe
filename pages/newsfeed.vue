<template>
  <div>
    <h1>AUTH</h1>
    <NuxtLink to="/user/1630998618">HEHE</NuxtLink>
    <NuxtLink to="/user/1630930757">HOHO</NuxtLink>

  </div>

</template>

<script>
export default {
  layout: 'newsfeed',
  mounted() {
    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
  }
}
</script>

<style>

</style>