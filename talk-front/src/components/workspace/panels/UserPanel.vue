<script lang="ts">
import { defineComponent } from 'vue'
import { PlusIcon, PhoneIcon, MailIcon, BellIcon } from '@zhuowenli/vue-feather-icons'

import { openPanel } from '/@src/composition/state/ui/workspacePanelState'
import { openModal } from '/@src/composition/state/ui/workspaceModalState'
import {
  getUser,
  getUserAvatar,
  loggedUserId,
} from '/@src/composition/state/user/authState'

const UserPanel = defineComponent({
  name: 'UserPanel',
  components: {
    PlusIcon,
    PhoneIcon,
    MailIcon,
    BellIcon,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  setup() {
    // UserPanel - Composition API

    return {
      getUser,
      getUserAvatar,
      loggedUserId,
      openModal,
      openPanel,
    }
  },
})

export default UserPanel
</script>

<template>
  <div class="panel-body is-user-details">
    <div v-if="userId !== ''" class="panel-body-inner">
      <div class="subheader">
        <div class="action-icon panel-back" @click="openPanel('people')">
          <i class="material-icons">arrow_back</i>
        </div>

        <template v-if="loggedUserId !== userId">
          <div
            class="action-icon ml-auto hint--top hint--rounded"
            data-hint="Call"
            @click="openModal('call', userId)"
          >
            <i class="material-icons">videocam</i>
          </div>
          <div
            class="action-icon hint--bottom hint--rounded"
            data-hint="Call"
            @click="openModal('call', userId)"
          >
            <i class="material-icons">photo_camera</i>
          </div>
          <div
            class="action-icon hint--right hint--rounded"
            data-hint="Call"
            @click="openModal('call', userId)"
          >
            <i class="material-icons">mic</i>
          </div>
        </template>
      </div>

      <div class="details-avatar">
        <img
          loading="lazy"
          :src="getUserAvatar(userId)"
          alt=""
          @error="$event.target.src = 'https://via.placeholder.com/150x150'"
        />
        <div
          v-if="loggedUserId !== userId"
          class="call-me action-icon hint--right hint--rounded"
          data-hint="Call"
          @click="openModal('call', userId)"
        >
          <i class="material-icons">phone</i>
        </div>
      </div>

      <div class="user-meta has-text-centered">
        <h3>{{ getUser(userId).nickname }}</h3>
        <span>{{ getUser(userId).customStatus }}</span>
      </div>

      <div v-if="loggedUserId !== userId" class="user-actions">
        <a class="user-action">
          <PlusIcon />
        </a>
        <a class="user-action" @click="openModal('call', userId)">
          <PhoneIcon />
        </a>
        <a class="user-action">
          <MailIcon />
        </a>
        <a class="user-action">
          <BellIcon />
        </a>
      </div>

      <div class="user-about">
        <div class="about-block">
          <div class="about-text">
            <span>Projects</span>
            <span><a class="is-inverted" href="#" @click.prevent>82</a></span>
          </div>
        </div>
        <div class="about-block">
          <div class="about-text">
            <span>Teams</span>
            <span><a class="is-inverted" href="#" @click.prevent>3</a></span>
          </div>
        </div>
        <div class="about-block">
          <div class="about-text">
            <span>Posts</span>
            <span><a class="is-inverted" href="#" @click.prevent>42</a></span>
          </div>
        </div>
        <div class="about-block">
          <div class="about-text">
            <span>Comments</span>
            <span><a class="is-inverted" href="#" @click.prevent>192</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
