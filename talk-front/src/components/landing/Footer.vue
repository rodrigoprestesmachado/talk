<script lang="ts">
import { defineComponent } from 'vue'
import { HeartIcon } from '@zhuowenli/vue-feather-icons'

import Bubbles from '/@src/components/landing/Bubbles.vue'

const LandingFooter = defineComponent({
  name: 'LandingFooter',
  components: {
    HeartIcon,
    Bubbles,
  },
  setup() {
    // Footer - Composition API

    return {}
  },
})

export default LandingFooter
</script>

<template>
  <footer class="footer">
    <Bubbles />

    <div class="container">
      <div class="footer-flex">
        <a href="https://cssninja.io" target="_blank" class="digisquad-footer">
          <img class="logo" src="/img/logo/cssninja.svg" />
        </a>
        <div class="ninja">
          <div class="made-by">
            &copy; 2020-2021 | Designed and coded with
            <HeartIcon class="love" />
          </div>
        </div>
      </div>
    </div>
  </footer>

  <svg style="position: fixed; top: 100vh">
    <defs>
      <filter id="blob">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="10"
          result="blur"
        ></feGaussianBlur>
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="blob"
        ></feColorMatrix>
        <feComposite in="SourceGraphic" in2="blob" operator="atop"></feComposite>
      </filter>
    </defs>
  </svg>
</template>
