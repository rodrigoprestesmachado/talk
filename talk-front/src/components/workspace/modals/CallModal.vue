<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import {
  PhoneOutgoingIcon,
  MessageCircleIcon,
  PhoneOffIcon,
} from '@zhuowenli/vue-feather-icons'

import { getUser, getUserAvatar } from '/@src/composition/state/user/authState'

const CallModal = defineComponent({
  name: 'CallModal',
  components: {
    PhoneOutgoingIcon,
    MessageCircleIcon,
    PhoneOffIcon,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  setup(props) {
    // CallModal - Composition API

    const connecting = ref(false)
    let timeoutIdCall: NodeJS.Timeout | null = null

    const stopCall = () => {
      if (timeoutIdCall) {
        clearTimeout(timeoutIdCall)
      }

      connecting.value = false
    }

    const startCall = () => {
      if (timeoutIdCall) {
        clearTimeout(timeoutIdCall)
      }

      connecting.value = true

      timeoutIdCall = setTimeout(stopCall, 8000)
    }

    watch(
      props,
      () => {
        if (props.userId) {
          startCall()
        } else {
          stopCall()
        }
      },
      {
        immediate: true,
        deep: true,
      }
    )

    return {
      getUser,
      getUserAvatar,
      startCall,
      connecting,
    }
  },
})

export default CallModal
</script>

<template>
  <div class="call-modal action-modal">
    <div class="inner" @click="$emit('close')"></div>

    <div v-if="userId !== ''" class="action-modal-card">
      <img
        id="call-avatar"
        class="call-avatar"
        loading="lazy"
        :src="getUserAvatar(userId)"
        alt=""
        @error="$event.target.src = 'https://via.placeholder.com/150x150'"
      />

      <div class="call-button-wrap" :class="[!connecting && 'is-hidden']">
        <button class="call-button fas fa-phone"></button>
      </div>

      <h3>
        Calling
        <span class="username-value">{{ getUser(userId).nickname }}</span>
      </h3>

      <p v-if="connecting" class="help-text">
        We'll connect you when
        <span class="username-value">{{ getUser(userId).nickname }}</span> picks up.
      </p>
      <p v-else class="help-text">
        Looks like
        <span class="username-value">{{ getUser(userId).nickname }}</span>
        wasn't able to pick up the call. What would you like to do next?
      </p>

      <div class="end-controls" :class="[connecting && 'is-hidden']">
        <button @click="startCall">
          <span class="icon is-small">
            <PhoneOutgoingIcon />
          </span>
          <span>Call Again</span>
        </button>
        <button>
          <span class="icon is-small">
            <MessageCircleIcon />
          </span>
          <span>Send Message</span>
        </button>
      </div>

      <div class="modal-controls has-text-centered">
        <button class="button action-modal-close" @click="$emit('close')">
          <span class="icon is-small">
            <PhoneOffIcon />
          </span>
          <span>End Call</span>
        </button>
      </div>
    </div>
  </div>
</template>
