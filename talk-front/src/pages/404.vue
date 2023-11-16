<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import Blobs from '/@src/components/landing/Blobs.vue'

const NotFoundPage = defineComponent({
  name: 'NotFoundPage',
  components: {
    Blobs,
  },
  setup() {
    onMounted(() => {
      document.title = 'Moebius :: Page not found :('
    })
  },
})

export default NotFoundPage
</script>

<template>
  <div class="hero is-fullheight">
    <Blobs />

    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h1 class="title is-1">404 :(</h1>
            <h3 class="subtitle is-5">Page not found.</h3>
            <p>Sorry, the page you are looking for does not exist</p>
            <div class="buttons">
              <RouterLink :to="{ name: 'index' }" class="button is-primary raised"
                >Back to home</RouterLink
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
</template>
