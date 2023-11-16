<script lang="ts">
import { defineComponent } from 'vue'
import { Trash2Icon } from '@zhuowenli/vue-feather-icons'

const DeleteConversationModal = defineComponent({
  name: 'DeleteConversationModal',
  components: {
    Trash2Icon,
  },
  emits: ['close'],
  setup() {
    // DeleteConversationModal - Composition API

    return {}
  },
})

export default DeleteConversationModal
</script>

<template>
  <div class="delete-conversation-modal action-modal">
    <div class="inner" @click="$emit('close')"></div>

    <div class="action-modal-card">
      <img class="modal-illustration" src="/img/illustrations/delete.svg" alt="" />
      <h3>Delete Conversation</h3>
      <p>
        Are you sure you want to delete this conversation? It will not show anymore in
        your conversations and you won't be able to recover it.
      </p>

      <div class="modal-controls">
        <button class="button action-modal-close" @click="$emit('close')">
          <span>Cancel</span>
        </button>
        <button class="button is-danger">
          <span class="icon is-small">
            <Trash2Icon />
          </span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>
