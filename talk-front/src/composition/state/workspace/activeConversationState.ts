/**
 * ActiveConversationState Composition API
 */

import { computed, reactive, ref } from 'vue'
import axios from 'axios'

import { Conversation } from '/@src/models'

type ActiveConversationState = {
  activeConversation: Conversation | null
}

/* ActiveConversationState internal data */

const state = reactive<ActiveConversationState>({
  activeConversation: null,
})

/* ActiveConversationState data */

export const loading = ref(true)
export const activeConversation = computed(() => state.activeConversation)

/* ActiveConversationState mutations */

export async function loadConversation(conversationId: string) {
  loading.value = true

  // simulate newtwork latency
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 1200)
  })

  // call conversation content api
  // errors are not catched here: they have to be handled in components
  // so we can display related message to user (using a toast, ...)
  const response = await axios.get(
    `/api/conversations/conversation-${conversationId}.json`
  )
  const conversation: Conversation = response.data

  if (conversation) {
    state.activeConversation = conversation
  }

  loading.value = false
}
