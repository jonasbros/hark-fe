<template>
  <h1>AUTH</h1>
</template>

<script>
export default {
  layout: 'authenticated',
  mounted() {
    this.$nuxt.$emit('isPageLoading', false);
  }
}
</script>

<style>

</style>