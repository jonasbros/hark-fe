<template>
  <v-row>
    <h1 v-if="user">{{ user.name }}</h1>
  </v-row>
</template>

<script>
export default {
  props: ['user']
}

</script>

<style>

</style>