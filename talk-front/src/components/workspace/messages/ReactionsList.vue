<script lang="ts">
import { defineComponent } from 'vue'

const ReactionsList = defineComponent({
  name: 'ReactionsList',
  props: {
    reactions: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // ReactionsList - Composition API

    return {}
  },
})

export default ReactionsList
</script>

<template>
  <div class="reaction-counts">
    <div class="reaction-count">
      <span>👍</span>
      <span>1</span>
    </div>
  </div>
</template>
