<template>
  <div>
    <h1>AUTH</h1>
    <NuxtLink to="/user/123">HEHE</NuxtLink>
  </div>

</template>

<script>
export default {
  layout: 'authenticated',
  mounted() {
    this.$store.dispatch('UPDATE_IS_PAGE_LOADING', false)
  }
}
</script>

<style>

</style>