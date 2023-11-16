<script lang="ts">
import { defineComponent } from 'vue'
import { PlusIcon } from '@zhuowenli/vue-feather-icons'

const ReactionInput = defineComponent({
  name: 'ReactionInput',
  components: {
    PlusIcon,
  },
  setup() {
    // ReactionInput - Composition API

    return {}
  },
})

export default ReactionInput
</script>

<template>
  <div class="reactions-toolbar">
    <button class="reaction">
      <span>👍</span>
    </button>
    <button class="reaction">
      <span>👊</span>
    </button>
    <button class="reaction">
      <span>🙂</span>
    </button>
    <button class="reaction">
      <span>😄</span>
    </button>
    <button class="reaction">
      <PlusIcon />
    </button>
  </div>
</template>
