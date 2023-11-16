<script lang="ts">
import { defineComponent } from 'vue'
import { ArchiveIcon } from '@zhuowenli/vue-feather-icons'

const ArchiveConversationModal = defineComponent({
  name: 'ArchiveConversationModal',
  components: {
    ArchiveIcon,
  },
  emits: ['close'],
  setup() {
    // ArchiveConversationModal - Composition API

    return {}
  },
})

export default ArchiveConversationModal
</script>

<template>
  <div class="archive-conversation-modal action-modal">
    <div class="inner" @click="$emit('close')"></div>

    <div class="action-modal-card">
      <img class="modal-illustration" src="/img/illustrations/archive.svg" alt="" />
      <h3>Archive Conversation</h3>
      <p>
        Are you sure you want to archive this conversation? It will not show anymore in
        your conversations. Instead, you'll find it in your archived conversations list.
      </p>

      <div class="modal-controls">
        <button class="button action-modal-close" @click="$emit('close')">
          <span>Cancel</span>
        </button>
        <button class="button is-primary">
          <span class="icon is-small">
            <ArchiveIcon />
          </span>
          <span>Archive</span>
        </button>
      </div>
    </div>
  </div>
</template>
