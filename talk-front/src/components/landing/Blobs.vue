<script lang="ts">
import { defineComponent } from 'vue'
import Blob from '/@src/components/landing/Blob.vue'

const Blobs = defineComponent({
  name: 'Blobs',
  components: {
    Blob,
  },
  setup() {
    // Blobs - Composition API

    return {}
  },
})

export default Blobs
</script>

<template>
  <div class="morphing-blob-wrapper is-blob-1">
    <Blob />
  </div>
  <div class="morphing-blob-wrapper is-blob-2">
    <Blob />
  </div>
  <div class="morphing-blob-wrapper is-blob-3">
    <Blob />
  </div>
  <div class="morphing-blob-wrapper is-blob-4">
    <Blob />
  </div>
  <div class="morphing-blob-wrapper is-blob-5">
    <Blob />
  </div>
  <div class="morphing-blob-wrapper is-blob-6">
    <Blob />
  </div>
  <div class="morphing-blob-wrapper is-blob-7">
    <Blob />
  </div>
</template>
