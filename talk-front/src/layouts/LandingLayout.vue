<script lang="ts">
import { defineComponent } from 'vue'

import LandingFooter from '/@src/components/landing/Footer.vue'
import LandingNav from '/@src/components/landing/Nav.vue'

const LandingLayout = defineComponent({
  name: 'LandingLayout',
  components: {
    LandingNav,
    LandingFooter,
  },
  setup() {
    // LandingLayout - Composition API

    return {}
  },
})

export default LandingLayout
</script>

<template>
  <div class="landing-page-wrapper">
    <LandingNav />

    <RouterView />
  </div>

  <LandingFooter />
</template>

<style lang="scss">
@import '../assets/scss/abstracts/variables';
@import '../assets/scss/pages/landing';
</style>
