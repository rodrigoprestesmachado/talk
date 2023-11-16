<script lang="ts">
import { defineComponent } from 'vue'

import { getUserAvatar } from '/@src/composition/state/user/authState'
import {
  conversationsInfo,
  loadConversations,
  isActive,
  selectConversation,
} from '/@src/composition/state/user/conversationListState'

const TheConversationNav = defineComponent({
  name: 'TheConversationNav',
  setup() {
    // TheConversationNav - Composition API

    return {
      getUserAvatar,
      isActive,
      conversationsInfo,
      selectConversation,
    }
  },
})

export default TheConversationNav
</script>

<template>
  <!-- conversations item list -->
  <a
    v-for="conversationInfo in conversationsInfo"
    :key="conversationInfo.id"
    class="user-item"
    :class="[isActive(conversationInfo.id) && 'is-active']"
    @click="selectConversation(conversationInfo.id)"
  >
    <div class="avatar-container">
      <img
        class="user-avatar"
        :src="getUserAvatar(conversationInfo.ownerId)"
        alt=""
        @error="$event.target.src = 'https://via.placeholder.com/32x32'"
      />
      <div v-if="conversationInfo.unreadMessages > 0" class="conversation-count">
        <span>{{ conversationInfo.unreadMessages }}</span>
      </div>
    </div>
  </a>
</template>
