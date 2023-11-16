<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import VueScrollTo from 'vue-scrollto'

const LandingNav = defineComponent({
  name: 'LandingNav',
  setup() {
    // Nav - Composition API

    const isScrolled = ref(false)
    const isMobileNavOpen = ref(false)

    const scrollHandler = () => {
      if (window.scrollY > 65) {
        isScrolled.value = true
      } else {
        isScrolled.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', scrollHandler, { passive: true })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandler)
    })

    return {
      isScrolled,
      isMobileNavOpen,
      scrollTo: VueScrollTo.scrollTo,
    }
  },
})

export default LandingNav
</script>

<template>
  <!--Landing Nav-->
  <div class="landing-nav" :class="[(isScrolled || isMobileNavOpen) && 'is-scrolled']">
    <div class="container">
      <div class="inner">
        <!--Mobile Menu-->
        <div class="landing-nav-menu" :class="[isMobileNavOpen && 'is-block']">
          <div class="menu-inner">
            <!--Link-->
            <div class="nav-link">
              <a
                class="scroll-link"
                @click="
                  () => {
                    isMobileNavOpen = false
                    scrollTo('#demos', 500, { offset: -30 })
                  }
                "
                >Demos</a
              >
            </div>
            <!--Link-->
            <div class="nav-link">
              <a href="https://docs.cssninja.io/moebius" target="_blank">Documentation</a>
            </div>
            <!--Link-->
            <div class="nav-link">
              <a href="https://cssninja.io" target="_blank">Support</a>
            </div>
            <!--Link-->
            <div class="nav-link">
              <a href="#" target="_blank" class="button is-primary is-fullwidth raised"
                >Buy Now</a
              >
            </div>
          </div>
        </div>

        <!--Desktop Menu-->
        <div class="left">
          <a
            class="nav-link"
            @click="
              () => {
                isMobileNavOpen = false
                scrollTo('#app', 500, { offset: -30 })
              }
            "
          >
            <img src="/img/logo/moebius.svg" alt="" />
          </a>
          <div class="burger-wrapper">
            <button class="menu-icon v-2" @click="isMobileNavOpen = !isMobileNavOpen">
              <span></span>
            </button>
          </div>
        </div>
        <div class="center">
          <!--Link-->
          <div class="nav-link">
            <a v-scroll-to="{ el: '#demos', offset: -30 }" class="scroll-link">Demos</a>
          </div>
          <!--Link-->
          <div class="nav-link">
            <a href="https://docs.cssninja.io/moebius" target="_blank">Documentation</a>
          </div>
          <!--Link-->
          <div class="nav-link">
            <a href="https://cssninja.io" target="_blank">Support</a>
          </div>
        </div>
        <div class="right">
          <a
            href="https://themeforest.net/item/moebius-vuejs-3-chat-platform-ui/29852034"
            target="_blank"
            class="button is-primary raised"
            >Buy Now</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
