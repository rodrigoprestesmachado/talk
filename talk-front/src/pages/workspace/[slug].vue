<script lang="ts">
import { watch, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { loadUsers, isAuthenticated } from '/@src/composition/state/user/authState'
import { loadConversation } from '/@src/composition/state/workspace/activeConversationState'
import { POSITION, useToast } from 'vue-toastification'
import {
  loadConversations,
  activeConversationId,
  selectConversation,
} from '/@src/composition/state/user/conversationListState'

import TheWorkspaceBody from '/@src/components/workspace/TheWorkspaceBody.vue'
import TheWorkspaceNav from '/@src/components/workspace/TheWorkspaceNav.vue'
import TheWorkspacePanel from '/@src/components/workspace/TheWorkspacePanel.vue'
import TheWorkspaceSideBar from '/@src/components/workspace/TheWorkspaceSideBar.vue'

import TheDrawerHandler from '/@src/components/workspace/drawers/TheDrawerHandler.vue'
import TheModalHandler from '/@src/components/workspace/modals/TheModalHandler.vue'

const WorkspacePage = defineComponent({
  name: 'WorkspacePage',
  components: {
    TheWorkspaceBody,
    TheWorkspaceNav,
    TheWorkspacePanel,
    TheWorkspaceSideBar,
    TheDrawerHandler,
    TheModalHandler,
  },
  setup() {
    if (!isAuthenticated.value) {
      return {}
    }

    const toast = useToast()

    // load users from api
    loadUsers()

    // load user conversations from api
    loadConversations()
      .then((conversationsInfo) => {
        // select first conversation when loaded
        selectConversation(conversationsInfo[0].id)

        document.title = 'Moebius :: Your workspace'
      })
      .catch((error) => {
        toast.error('unable to load your conversations', {
          timeout: 4000,
          position: POSITION.BOTTOM_CENTER,
        })
      })

    // load conversation messages when selected conversation changed
    // hint: select the last conversation to see toast error
    watch(activeConversationId, async () => {
      try {
        await loadConversation(activeConversationId.value)
      } catch (error) {
        toast.error('something went wrong while loading the conversation', {
          timeout: 4000,
          position: POSITION.BOTTOM_CENTER,
        })
      }
    })

    return {}
  },
})

export default WorkspacePage
</script>

<template>
  <div class="chat-wrapper">
    <div class="chat-inner">
      <TheWorkspaceNav />
      <TheWorkspaceSideBar />
      <TheWorkspaceBody />
      <TheWorkspacePanel />
    </div>
  </div>
  <TheDrawerHandler />

  <TheModalHandler />
</template>
