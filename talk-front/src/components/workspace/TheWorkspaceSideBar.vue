<script lang="ts">
import { defineComponent, ref } from 'vue'

import { isOpen as isMobileLeftNavOpen } from '/@src/composition/state/ui/mobileLeftNavState'
import { openDrawer } from '/@src/composition/state/ui/workspaceDrawerState'

import MoebiusLogo from '/@src/components/common/MoebiusLogo.vue'
import TheConversationNav from '/@src/components/workspace/TheConversationNav.vue'

const TheWorkspaceSideBar = defineComponent({
  name: 'TheWorkspaceSideBar',
  components: {
    MoebiusLogo,
    TheConversationNav,
  },
  setup() {
    // TheWorkspaceSideBar - Composition API

    return {
      openDrawer,
      isMobileLeftNavOpen,
    }
  },
})

export default TheWorkspaceSideBar
</script>

<template>
  <div class="users-sidebar" :class="[isMobileLeftNavOpen && 'is-mobile-active']">
    <!-- Header -->
    <RouterLink
      :to="{ name: 'workspace', params: { slug: 'my-workspace' } }"
      class="header-item"
    >
      <MoebiusLogo />
    </RouterLink>

    <!-- User list -->
    <div class="conversations-list has-slimscroll-xs">
      <TheConversationNav />
    </div>

    <!-- Add Conversation -->
    <div class="footer-item">
      <a class="add-button" @click="openDrawer('new-conversation')">
        <i class="material-icons">add</i>
      </a>
    </div>
  </div>
</template>
