<script lang="ts">
import { defineComponent } from 'vue'

const AuthLayout = defineComponent({
  name: 'AuthLayout',
  setup() {
    // AuthLayout - Composition API

    return {}
  },
})

export default AuthLayout
</script>

<template>
  <main role="main">
    <RouterView />
  </main>
</template>

<style lang="scss">
@import '../assets/scss/abstracts/variables';
@import '../assets/scss/pages/login';
</style>
