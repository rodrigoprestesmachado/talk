<script lang="ts">
import { defineComponent } from 'vue'

import {
  currentModalId,
  currentModalData,
  closeModal,
} from '/@src/composition/state/ui/workspaceModalState'

import NewConversationModal from '/@src/components/workspace/modals/NewConversationModal.vue'
import ArchiveConversationModal from '/@src/components/workspace/modals/ArchiveConversationModal.vue'
import DeleteConversationModal from '/@src/components/workspace/modals/DeleteConversationModal.vue'
import CallModal from '/@src/components/workspace/modals/CallModal.vue'
import UploadFileModal from '/@src/components/workspace/modals/UploadFileModal.vue'

const TheModalHandler = defineComponent({
  name: 'TheModalHandler',
  components: {
    NewConversationModal,
    ArchiveConversationModal,
    DeleteConversationModal,
    CallModal,
    UploadFileModal,
  },
  setup() {
    // TheModalHandler - Composition API

    return {
      currentModalId,
      currentModalData,
      closeModal,
    }
  },
})

export default TheModalHandler
</script>

<template>
  <NewConversationModal
    :class="[currentModalId === 'new-conversation' && 'is-active']"
    @close="closeModal()"
  />
  <ArchiveConversationModal
    :class="[currentModalId === 'archive-conversation' && 'is-active']"
    @close="closeModal()"
  />
  <DeleteConversationModal
    :class="[currentModalId === 'delete-conversation' && 'is-active']"
    @close="closeModal()"
  />
  <CallModal
    :class="[currentModalId === 'call' && 'is-active']"
    :user-id="(currentModalId === 'call' && currentModalData) || ''"
    @close="closeModal()"
  />
  <UploadFileModal
    :class="[currentModalId === 'upload-file' && 'is-active']"
    :file="(currentModalId === 'upload-file' && currentModalData.file) || null"
    :message="(currentModalId === 'upload-file' && currentModalData.message) || ''"
    @validate="
      ({ file, previewSrc, comment }) => {
        if (currentModalId === 'upload-file' && currentModalData.submitFile) {
          currentModalData.submitFile(file, previewSrc, comment)
          closeModal()
        }
      }
    "
    @close="closeModal()"
  />
</template>
