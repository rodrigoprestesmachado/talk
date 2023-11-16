<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { FileTextIcon, DownloadCloudIcon } from '@zhuowenli/vue-feather-icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en-gb'

import {
  loggedUserId,
  getLoggedUserAvatar,
  getUserAvatar,
} from '/@src/composition/state/user/authState'

import ReactionsInput from '/@src/components/workspace/messages/ReactionsInput.vue'
import ReactionsList from '/@src/components/workspace/messages/ReactionsList.vue'

dayjs.extend(relativeTime)

const WorkspaceMessage = defineComponent({
  name: 'WorkspaceMessage',
  components: {
    ReactionsInput,
    ReactionsList,
    FileTextIcon,
    DownloadCloudIcon,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // WorkspaceMessage - Composition API

    const attachedImage = ref<HTMLElement | null>(null)
    const formatedDate = computed(() => {
      return (date: string) => {
        return dayjs(date).fromNow()
      }
    })

    onMounted(() => {
      if (attachedImage.value) {
        if ('lightGallery' in window) {
          window.lightGallery(attachedImage.value, {
            selector: 'this',
          })
        }
      }
    })

    return {
      loggedUserId,
      getLoggedUserAvatar,
      getUserAvatar,
      formatedDate,
      attachedImage,
    }
  },
})

export default WorkspaceMessage
</script>

<template>
  <div
    class="chat-message"
    :class="[
      message.senderId === loggedUserId && 'is-sent',
      message.senderId !== loggedUserId && 'is-received',
      message.reactions.length && 'has-reactions',
    ]"
  >
    <img
      loading="lazy"
      :src="getUserAvatar(message.senderId)"
      alt=""
      @error="$event.target.src = 'https://via.placeholder.com/32x32'"
    />
    <div class="message-block">
      <span>{{ formatedDate(message.date) }}</span>
      <div class="message-text">
        <template
          v-if="message.attachement && message.attachement.mimetype.startsWith('image/')"
        >
          <a ref="attachedImage" :href="message.attachement.url">
            <img loading="lazy" class="uploaded-image" :src="message.attachement.url" />
          </a>
        </template>
        <template v-else-if="message.attachement">
          <div class="uploaded-file">
            <div class="icon-container">
              <FileTextIcon />
            </div>
            <div class="meta">
              <span>{{ message.attachement.name }}</span>
              <span>{{ message.attachement.size }}</span>
            </div>
            <div class="action">
              <a :href="message.attachement.url" :download="message.attachement.name">
                <DownloadCloudIcon />
              </a>
            </div>
          </div>
        </template>

        {{ message.content }}
      </div>

      <!--Add reactions buttons-->
      <ReactionsInput />

      <!--Reactions list -->
      <ReactionsList v-if="message.reactions.length" :reactions="message.reactions" />
    </div>
  </div>
</template>
