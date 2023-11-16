<script lang="ts">
import { defineComponent } from 'vue'
import { EyeIcon, FileIcon, PhoneIcon } from '@zhuowenli/vue-feather-icons'

import { loggedUserId } from '/@src/composition/state/user/authState'
import { openPanel } from '/@src/composition/state/ui/workspacePanelState'
import { openModal } from '/@src/composition/state/ui/workspaceModalState'
import { openDrawer } from '/@src/composition/state/ui/workspaceDrawerState'

const ParticipantItem = defineComponent({
  name: 'ParticipantItem',
  components: {
    EyeIcon,
    FileIcon,
    PhoneIcon,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // Footer - Composition API

    return {
      openPanel,
      openModal,
      openDrawer,
      loggedUserId,
    }
  },
})

export default ParticipantItem
</script>

<template>
  <div class="participant-item">
    <!-- participant details -->
    <div class="avatar-container">
      <img
        loading="lazy"
        :src="user.avatar"
        alt=""
        @error="$event.target.src = 'https://via.placeholder.com/32x32'"
      />
      <div
        class="user-status"
        :class="[
          user.status === 'busy' && 'is-busy',
          user.status === 'online' && 'is-online',
          user.status === 'offline' && 'is-offline',
        ]"
      ></div>
    </div>

    <div class="meta">
      <span>{{ user.nickname }}</span>
      <span>{{ user.customStatus }}</span>
    </div>

    <div class="actions">
      <button
        class="action is-view hint--top hint--rounded"
        data-hint="Profile"
        @click="openPanel('user-details', user.id)"
      >
        <EyeIcon />
      </button>
      <button
        v-if="loggedUserId !== user.id"
        class="action is-call hint--top hint--rounded"
        data-hint="Call"
        @click="openModal('call', user.id)"
      >
        <PhoneIcon />
      </button>
      <button
        class="action is-note hint--top hint--rounded"
        data-hint="Files"
        @click="openDrawer('shared-files')"
      >
        <FileIcon />
      </button>
    </div>
  </div>
</template>
