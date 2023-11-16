<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VueScrollTo from 'vue-scrollto'
import {
  BookOpenIcon,
  CodeIcon,
  SmartphoneIcon,
  MoonIcon,
  ZapIcon,
  ServerIcon,
  UmbrellaIcon,
  TriangleIcon,
} from '@zhuowenli/vue-feather-icons'

import { loginUser } from '/@src/composition/state/user/authState'
import { isEnabled as isDarkModeEnabled } from '/@src/composition/state/ui/darkModeState'

import Blobs from '/@src/components/landing/Blobs.vue'

const IndexPage = defineComponent({
  name: 'IndexPage',
  components: {
    Blobs,
    BookOpenIcon,
    CodeIcon,
    SmartphoneIcon,
    MoonIcon,
    ZapIcon,
    ServerIcon,
    UmbrellaIcon,
    TriangleIcon,
  },
  setup() {
    const router = useRouter()

    const goToWorkspace = async (darkmode = false) => {
      await loginUser('email@example.com', 'password')

      isDarkModeEnabled.value = darkmode

      router.push({
        name: 'workspace',
        params: {
          slug: 'my-workspace',
        },
      })
    }

    onMounted(() => {
      document.title = 'Moebius :: A VueJS 3 Chat Platform UI'
      isDarkModeEnabled.value = false
    })

    return {
      goToWorkspace,
      isDarkModeEnabled,
      scrollTo: VueScrollTo.scrollTo,
    }
  },
})

export default IndexPage
</script>

<template>
  <div class="hero is-fullheight">
    <Blobs />

    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h1 class="title is-1">Moebius Chat.</h1>
            <h3 class="subtitle is-5">VueJS 3 Chat Platform UI.</h3>
            <p>
              Moebius is a full featured Chat UI built with VueJS 3 and its powerful
              composition API. Everything is there to start a professional chat platform
              project.
            </p>
            <div class="buttons">
              <a
                class="button is-primary raised"
                @click="scrollTo('#demos', 500, { offset: -30 })"
                >Get started</a
              >
              <a href="https://docs.cssninja.io/moebius" target="_blank" class="button"
                >Read The Docs</a
              >
            </div>
          </div>
          <div class="column is-7">
            <img
              class="has-light-shadow levitate"
              src="/img/illustrations/screen-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <!--Stacks-->
      <div class="stacks">
        <div class="stack">
          <img src="/img/icons/stacks/vuejs.svg" alt="" />
        </div>
        <div class="stack">
          <img src="/img/icons/stacks/typescript.svg" alt="" />
        </div>
        <div class="stack">
          <img src="/img/icons/stacks/sass.svg" alt="" />
        </div>
        <div class="stack">
          <img src="/img/icons/stacks/bulma.svg" alt="" />
        </div>
        <div class="stack">
          <img src="/img/icons/stacks/rollup.svg" alt="" />
        </div>
      </div>

      <!--Title-->
      <div class="section-title has-text-centered">
        <h2 class="title is-2">Full Featured Chat</h2>
        <h4>An out of the box Vue JS ready chat UI.</h4>
      </div>

      <!--Boxed Features-->
      <div class="boxed-features">
        <div class="inner-card">
          <div class="flex-cell is-bordered">
            <TriangleIcon />
            <h3>VueJS 3</h3>
            <p>All you need to build a professional website is there</p>
          </div>
          <div class="flex-cell is-bordered">
            <UmbrellaIcon />
            <h3>Bulma Framework</h3>
            <p>Bulkit offers endless possibilities for your pages</p>
          </div>
          <div class="flex-cell is-bordered">
            <ServerIcon />
            <h3>Composition API</h3>
            <p>Buying Bulkit gives you access to lifetime updates</p>
          </div>
          <div class="flex-cell is-bordered no-border-edge">
            <ZapIcon />
            <h3>Sass Powered</h3>
            <p>Our support helps you solve any issues you have</p>
          </div>
          <div class="flex-cell">
            <MoonIcon />
            <h3>Dark Mode</h3>
            <p>Bulkit's code is structured and easy to understand</p>
          </div>
          <div class="flex-cell">
            <SmartphoneIcon />
            <h3>Ultra Responsive</h3>
            <p>FileUploader and Icons Mind are included ($90 value)</p>
          </div>
          <div class="flex-cell">
            <CodeIcon />
            <h3>Clean Code</h3>
            <p>Bulkit is built with Bulma, a mobile first framework</p>
          </div>
          <div class="flex-cell no-border-edge">
            <BookOpenIcon />
            <h3>Extensive Docs</h3>
            <p>A nice documentation to help you get started fast</p>
          </div>
        </div>
      </div>

      <!--CTA-->
      <div class="cta-block">
        <div class="head-text">
          <h3>Buy Moebius</h3>
          <p>Available on Envato Market</p>
        </div>
        <div class="head-action">
          <div class="buttons">
            <a
              href="https://themeforest.net/item/moebius-vuejs-3-chat-platform-ui/29852034"
              class="button is-primary raised"
              >Buy Now</a
            >
            <a href="https://cssninja.io" target="_blank" class="button chat-button"
              >Chat with us</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="demos" class="section section-alt">
    <div class="container">
      <!--Title-->
      <div class="section-title has-text-centered">
        <h2 class="title is-2">Built-in Demos</h2>
        <h4>Explore Demos.</h4>
      </div>

      <!--Demos-->
      <div class="demos-list">
        <!--Item-->
        <div class="demo-item">
          <RouterLink
            :to="{ name: 'workspace', params: { slug: 'my-workspace' } }"
            @click.prevent="goToWorkspace()"
          >
            <img class="has-light-shadow" src="/img/screenshots/chat.png" alt="" />
          </RouterLink>
          <RouterLink
            :to="{ name: 'workspace', params: { slug: 'my-workspace' } }"
            @click.prevent="goToWorkspace()"
          >
            <span>Chat Light Mode</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink
            :to="{ name: 'workspace', params: { slug: 'my-workspace' } }"
            @click.prevent="goToWorkspace(true)"
          >
            <img class="has-light-shadow" src="/img/screenshots/chat-dark.png" alt="" />
          </RouterLink>
          <RouterLink
            :to="{ name: 'workspace', params: { slug: 'my-workspace' } }"
            @click.prevent="goToWorkspace(true)"
          >
            <span>Chat Dark Mode</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink
            :to="{ name: 'workspace-create' }"
            @click="isDarkModeEnabled = false"
          >
            <img class="has-light-shadow" src="/img/screenshots/wizard.png" alt="" />
          </RouterLink>
          <RouterLink
            :to="{ name: 'workspace-create' }"
            @click="isDarkModeEnabled = false"
          >
            <span>Workspace Wizard Light</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink
            :to="{ name: 'workspace-create' }"
            @click="isDarkModeEnabled = true"
          >
            <img class="has-light-shadow" src="/img/screenshots/wizard-dark.png" alt="" />
          </RouterLink>
          <RouterLink
            :to="{ name: 'workspace-create' }"
            @click="isDarkModeEnabled = true"
          >
            <span>Workspace Wizard Dark</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink :to="{ name: 'auth-login' }">
            <img class="has-light-shadow" src="/img/screenshots/login-1.png" alt="" />
          </RouterLink>
          <RouterLink :to="{ name: 'auth-login' }">
            <span>Login v1</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink :to="{ name: 'auth-login-2' }">
            <img class="has-light-shadow" src="/img/screenshots/login-2.png" alt="" />
          </RouterLink>
          <RouterLink :to="{ name: 'auth-login-2' }">
            <span>Login v2</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink :to="{ name: 'auth-signup' }">
            <img class="has-light-shadow" src="/img/screenshots/signup-1.png" alt="" />
          </RouterLink>
          <RouterLink :to="{ name: 'auth-signup' }">
            <span>Signup v1</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink :to="{ name: 'auth-signup-2' }">
            <img class="has-light-shadow" src="/img/screenshots/signup-2.png" alt="" />
          </RouterLink>
          <RouterLink :to="{ name: 'auth-signup-2' }">
            <span>Signup v1</span>
          </RouterLink>
        </div>

        <!--Item-->
        <div class="demo-item">
          <RouterLink :to="{ name: 'auth-forgot-password' }">
            <img class="has-light-shadow" src="/img/screenshots/forgot.png" alt="" />
          </RouterLink>
          <RouterLink :to="{ name: 'auth-forgot-password' }">
            <span>Forgot Password</span>
          </RouterLink>
        </div>
      </div>

      <!--CTA-->
      <div class="cta-block">
        <div class="head-text">
          <h3>Buy Moebius</h3>
          <p>Available on Envato Market</p>
        </div>
        <div class="head-action">
          <div class="buttons">
            <a
              href="https://themeforest.net/item/moebius-vuejs-3-chat-platform-ui/29852034"
              class="button is-primary raised"
              >Buy Now</a
            >
            <a href="https://cssninja.io" target="_blank" class="button chat-button"
              >Chat with us</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <!--Title-->
      <div class="section-title has-text-centered">
        <h2 class="title is-2">There's More</h2>
        <h4>Available contextual views.</h4>
      </div>

      <div class="context-views">
        <div class="columns is-multiline">
          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-1.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-2.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-3.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-4.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-5.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-6.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-7.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-8.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-9.png" alt="" />
          </div>

          <!--Contextual View-->
          <div class="column is-6">
            <img class="has-light-shadow" src="/img/screenshots/context-10.png" alt="" />
          </div>
        </div>
      </div>

      <!--CTA-->
      <div class="cta-block no-border">
        <div class="head-text">
          <h3>Buy Moebius</h3>
          <p>Available on Envato Market</p>
        </div>
        <div class="head-action">
          <div class="buttons">
            <a
              href="https://themeforest.net/item/moebius-vuejs-3-chat-platform-ui/29852034"
              class="button is-primary raised"
              >Buy Now</a
            >
            <a href="https://cssninja.io" target="_blank" class="button chat-button"
              >Chat with us</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
