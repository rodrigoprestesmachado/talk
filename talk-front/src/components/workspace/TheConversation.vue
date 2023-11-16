<script lang="ts">
import { ref, watch, nextTick, defineComponent } from 'vue'

import {
  loading,
  activeConversation,
} from '/@src/composition/state/workspace/activeConversationState'
import { activeConversationId } from '/@src/composition/state/user/conversationListState'

import WorkspaceMessage from '/@src/components/workspace/messages/WorkspaceMessage.vue'
import ConversationEmptyPlaceholder from '/@src/components/common/ConversationEmptyPlaceholder.vue'
import ConversationLoadingPlaceholder from '/@src/components/common/ConversationLoadingPlaceholder.vue'

const TheConversation = defineComponent({
  name: 'TheConversation',
  components: {
    ConversationEmptyPlaceholder,
    ConversationLoadingPlaceholder,
    WorkspaceMessage,
  },
  setup() {
    // TheConversation - Composition API

    const innerChatElement = ref<HTMLElement | null>(null)

    // scroll to end of chat messages when new conversation loaded
    watch(
      loading,
      () => {
        nextTick(() => {
          if (loading.value === false && innerChatElement.value !== null) {
            innerChatElement.value.scrollTo({
              top: innerChatElement.value.scrollHeight,
              behavior: 'smooth',
            })
          }
        })
      },
      { immediate: true }
    )

    if (activeConversation) {
      // scroll to end of chat messages
      // when new messages are pushed in the active conversation
      watch(
        activeConversation,
        () => {
          nextTick(() => {
            if (loading.value === false && innerChatElement.value !== null) {
              innerChatElement.value.scrollTo({
                top: innerChatElement.value.scrollHeight,
                behavior: 'smooth',
              })
            }
          })
        },
        { deep: true }
      )
    }

    return {
      innerChatElement,
      loading,
      activeConversation,
      activeConversationId,
    }
  },
})

export default TheConversation
</script>

<template>
  <div
    v-if="activeConversationId"
    ref="innerChatElement"
    class="chat-body-inner has-slimscroll"
    :class="[
      !loading &&
        activeConversation &&
        activeConversation.messages.length === 0 &&
        'is-empty',
      !loading &&
        activeConversation &&
        activeConversation.participantIds.length > 2 &&
        'is-multiple',
    ]"
  >
    <!-- loading conversation placeholder -->
    <ConversationLoadingPlaceholder v-if="loading || !activeConversation" />

    <div v-else class="true-dom">
      <!-- empty conversation placeholder -->
      <template v-if="activeConversation.messages.length === 0">
        <div class="empty-placeholder text-center">
          <ConversationEmptyPlaceholder />

          <h2>No Messages</h2>
          <p>No messages in this conversation yet.</p>
        </div>
      </template>

      <!-- conversation content -->
      <template v-else>
        <div class="date-divider">
          <hr class="date-divider-line" />
          <span class="date-divider-text">Yesterday</span>
        </div>

        <WorkspaceMessage
          v-for="message in activeConversation.messages"
          :key="message.id"
          :message="message"
        />
      </template>
    </div>
  </div>
</template>
