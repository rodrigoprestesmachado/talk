/**
 * useMessageInput Composition API
 */
import { Ref, computed, ref, watch } from 'vue'
// import { EmojiButton } from '@joeattardi/emoji-button'
import { createPopup } from '@picmo/popup-picker'
import dayjs from 'dayjs'

import { activeConversation } from '/@src/composition/state/workspace/activeConversationState'
import { loggedUserId } from '/@src/composition/state/user/authState'

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const KEY_ENTER = 'Enter'
const KEY_SEMICOLON = ':'

export const useMessageInput = (target: Ref<HTMLElement | undefined>) => {
  const pickerShownWithSemicolon = ref(false)
  const isTyping = ref(false)
  const message = ref('')
  const textareaElement = ref<HTMLInputElement | null>(null)
  const fileInputElement = ref<HTMLInputElement | null>(null)
  let timeoutTypingId: NodeJS.Timer | null = null

  // typing state handler
  const stopTypingHandler = () => {
    if (timeoutTypingId) {
      clearTimeout(timeoutTypingId)
    }

    isTyping.value = false
  }

  const startTypingHandler = () => {
    isTyping.value = true

    if (timeoutTypingId) {
      clearTimeout(timeoutTypingId)
    }
    timeoutTypingId = setTimeout(stopTypingHandler, 2000)
  }

  // emoji picker options
  const picker = createPopup(
    {
      emojiSize: '1em',
      emojisPerRow: 8,
      visibleRows: 8,
      initialCategory: 'recents',
      autoFocusSearch: false,
      showPreview: false,
      // theme: 'lightTheme',
    },
    {
      position: 'top-end',
    }
  )

  // emoji picker handler
  picker.addEventListener('emoji:select', (event) => {
    const element = textareaElement.value as any

    startTypingHandler()

    if (element) {
      // inject emoji where the cursor is
      let newMessage = message.value.substring(0, element.selectionStart)

      newMessage += `${event.emoji}`
      newMessage += message.value.substring(element.selectionStart)

      message.value = newMessage
    } else {
      message.value += `${event.emoji}`
    }
  })

  const toggleEmojiPicker = ($event: MouseEvent | TouchEvent) => {
    const target = $event.target as any
    pickerShownWithSemicolon.value = false
    picker.open({
      referenceElement: target,
      triggerElement: target,
    })
  }

  const canPostMessage = computed(() => {
    return activeConversation.value !== null && loggedUserId.value !== ''
  })

  const submitMessage = ($event: Event) => {
    $event.preventDefault()

    if (message.value.trim() !== '') {
      if (canPostMessage.value && activeConversation.value) {
        const _message = {
          id: `${activeConversation.value.messages.length}`,
          senderId: loggedUserId.value,
          content: message.value.trim(),
          date: dayjs().format(),
          reactions: [],
        }

        activeConversation.value.messages.push(_message)
      }

      message.value = ''
      stopTypingHandler()
    }

    return false
  }

  const submitFile = (file: File, previewSrc: string, comment: string) => {
    if (canPostMessage.value && activeConversation.value) {
      const _message = {
        id: `${activeConversation.value.messages.length}`,
        senderId: loggedUserId.value,
        content: comment.trim(),
        date: dayjs().format(),
        attachement: {
          name: file.name,
          mimetype: file.type,
          url: previewSrc,
          size: formatBytes(file.size),
        },
        reactions: [],
      }

      activeConversation.value.messages.push(_message)
    }

    message.value = ''
    stopTypingHandler()
  }

  const onInputKeydown = ($event: KeyboardEvent) => {
    // allow user to submit message using enter
    if ($event.key === KEY_ENTER) {
      return submitMessage($event)
    }

    startTypingHandler()

    // show emoji picker when user enter a semicolon
    if ($event.key === KEY_SEMICOLON) {
      const lastChar = message.value.substring(message.value.length - 1)

      // handle if user enter a semicolon twice to realy insert a semicolon
      if (pickerShownWithSemicolon.value === true || lastChar === ':') {
        pickerShownWithSemicolon.value = false

        return true
      } else {
        const target = $event.target as any
        pickerShownWithSemicolon.value = true
        picker.open({
          referenceElement: target,
          triggerElement: target,
        })

        $event.preventDefault()
        return false
      }
    }
  }

  // reset message input when active conversation changed
  watch(
    activeConversation,
    () => {
      message.value = ''
    },
    { deep: true }
  )

  return {
    // data
    isTyping,
    message,
    textareaElement,
    fileInputElement,

    // computed
    canPostMessage,

    // actions
    toggleEmojiPicker,
    submitMessage,
    submitFile,
    onInputKeydown,
  }
}
