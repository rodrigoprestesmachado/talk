<script lang="ts">
import { defineComponent } from 'vue'

const WizardLayout = defineComponent({
  name: 'WizardLayout',
  setup() {
    // WizardLayout - Composition API

    return {}
  },
})

export default WizardLayout
</script>

<template>
  <main role="main">
    <RouterView />
  </main>
</template>

<style lang="scss">
@import '../assets/scss/abstracts/variables';
@import '../assets/scss/pages/wizard';
</style>
