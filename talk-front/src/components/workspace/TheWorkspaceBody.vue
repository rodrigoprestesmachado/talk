<script lang="ts">
import { watch, defineComponent } from 'vue'

import { isOpen as isMobileLeftNavOpen } from '/@src/composition/state/ui/mobileLeftNavState'

import TheMessageInput from '/@src/components/workspace/messages/TheMessageInput.vue'
import TheConversation from '/@src/components/workspace/TheConversation.vue'

const TheWorkspaceBody = defineComponent({
  name: 'TheWorkspaceBody',
  components: {
    TheMessageInput,
    TheConversation,
  },
  setup() {
    // TheWorkspaceBody - Composition API

    return {
      isMobileLeftNavOpen,
    }
  },
})

export default TheWorkspaceBody
</script>

<template>
  <div class="chat-body is-opened" :class="[isMobileLeftNavOpen && 'is-mobile-active']">
    <TheConversation />

    <TheMessageInput />

    <div class="chat-border"></div>
  </div>
</template>
