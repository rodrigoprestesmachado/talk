<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { SmileIcon, PaperclipIcon } from '@zhuowenli/vue-feather-icons'

import { isOpen as isMobileLeftNavOpen } from '/@src/composition/state/ui/mobileLeftNavState'
import { loading } from '/@src/composition/state/workspace/activeConversationState'
import { getLoggedUser } from '/@src/composition/state/user/authState'
import { useMessageInput } from '/@src/composition/use/useMessageInput'

import { openModal } from '/@src/composition/state/ui/workspaceModalState'
import { Message } from '/@src/models'

const TheMessageInput = defineComponent({
  name: 'TheMessageInput',
  components: {
    PaperclipIcon,
    SmileIcon,
  },
  setup() {
    // TheMessageInput - Composition API
    const target = ref<HTMLElement>()

    const {
      message,
      isTyping,
      textareaElement,
      fileInputElement,
      canPostMessage,
      submitMessage,
      submitFile,
      onInputKeydown,
      toggleEmojiPicker,
    } = useMessageInput(target)

    return {
      loading,
      getLoggedUser,
      isMobileLeftNavOpen,
      textareaElement,
      fileInputElement,
      canPostMessage,
      message,
      submitMessage,
      submitFile,
      toggleEmojiPicker,
      onInputKeydown,
      openModal,
      isTyping,
      unref,
    }
  },
})

export default TheMessageInput
</script>

<template>
  <div class="chat-action" :class="[isMobileLeftNavOpen && 'is-mobile-active']">
    <form class="chat-action-inner" @submit="submitMessage">
      <div class="typing-indicator-wrap" :class="[isTyping && 'is-active']">
        <div class="typing-indicator">
          <div class="typing">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <span class="typing-indicator-text">{{ getLoggedUser.nickname }} is typing</span>
      </div>

      <div class="control">
        <textarea
          ref="textareaElement"
          v-model="message"
          placeholder="Enviar uma mensagem"
          class="textarea comment-textarea"
          rows="1"
          @keydown="onInputKeydown"
        ></textarea>

        <div class="compose-dropdown">
          <div>
            <input
              ref="fileInputElement"
              type="file"
              accept="image/*, application/pdf, application/zip, application/tar, application/gzip, .rar"
              @change="
                (event: any) => {
                  openModal('upload-file', {
                    file: event.target.files[0],
                    message: unref(message),
                    submitFile,
                  })
                  event.target.value = ''
                }
              "
            />

            <button>
              <div class="add-button">
                <div class="button-inner">
                  <PaperclipIcon />
                </div>
              </div>
            </button>
          </div>
        </div>

        <div class="toolbar">
          <button type="button" class="button-emoji">
            <SmileIcon @click="toggleEmojiPicker" />
          </button>
          <button
            type="submit"
            class="button is-primary"
            :disabled="loading || !canPostMessage"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
