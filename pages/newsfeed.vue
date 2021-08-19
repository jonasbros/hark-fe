<template>
  <h1>newfessdfsd</h1>
</template>

<script>
export default {
  layout: 'authenticated',
  middleware: 'auth',
  mounted() {
    this.$nuxt.$emit('isPageLoading', false);
  }
}
</script>

<style>

</style>