/**
 * ConversationListState Composition API
 */

import { computed, reactive, ref } from 'vue'
import axios from 'axios'

import { ConversationInfo } from '/@src/models'

/* ConversationListState data */

export const conversationsInfo = reactive<ConversationInfo[]>([])
export const activeConversationId = ref('')
export const loading = ref(true)

/* ConversationListState computed data */

export const isActive = computed(() => {
  return (conversationId: string) => activeConversationId.value === conversationId
})

export const activeConversationInfo = computed<ConversationInfo | undefined>(() => {
  return conversationsInfo.find(
    (conversationInfo: ConversationInfo) =>
      conversationInfo.id === activeConversationId.value
  )
})

/* ConversationListState mutations */

export async function selectConversation(conversationId: string) {
  activeConversationId.value = conversationId
}

export async function loadConversations() {
  loading.value = true

  // call conversation list api
  // errors are not catched here: they have to be handled in components
  // so we can display related message to user (using a toast, ...)
  const response = await axios.get(`/api/conversations/list.json`)
  const data: ConversationInfo[] = response.data

  // clean conversations array
  conversationsInfo.splice(0, conversationsInfo.length)

  // push received users from api
  conversationsInfo.push(...data)

  loading.value = false

  return conversationsInfo
}
