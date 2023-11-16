<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { RotateCwIcon } from '@zhuowenli/vue-feather-icons'

import { closeDrawer } from '/@src/composition/state/ui/workspaceDrawerState'

const NotificationsSettingsDrawer = defineComponent({
  name: 'NotificationsSettingsDrawer',
  components: {
    RotateCwIcon,
  },
  emits: ['close'],
  setup() {
    // NotificationsSettingsDrawer - Composition API

    const whenMemberJoined = ref(true)
    const whenMention = ref(true)
    const whenBusy = ref(false)

    const hasNotificationEnabled = computed(() => {
      return whenMemberJoined.value || whenMention.value || whenBusy.value
    })

    const restore = () => {
      whenMemberJoined.value = true
      whenMention.value = true
      whenBusy.value = false
    }

    const toggleDisable = () => {
      if (hasNotificationEnabled.value) {
        whenMemberJoined.value = false
        whenMention.value = false
        whenBusy.value = false
      } else {
        restore()
      }
    }

    return {
      closeDrawer,
      hasNotificationEnabled,
      whenMemberJoined,
      whenMention,
      whenBusy,
      restore,
      toggleDisable,
    }
  },
})

export default NotificationsSettingsDrawer
</script>

<template>
  <div class="slide-panel is-right is-small">
    <div class="slide-panel-header">
      <h3>Notifications Settings</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body">
      <img
        class="sidebar-illustration"
        src="/img/illustrations/notifications.svg"
        alt=""
      />

      <!--Settings-->
      <div class="setting-list">
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="whenMemberJoined" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Member Joined</span>
            <span>When a member joins a conversation</span>
          </div>
        </div>
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="whenMention" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Mention</span>
            <span>When someone mentions you</span>
          </div>
        </div>
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="whenBusy" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Busy</span>
            <span>When status is set to busy</span>
          </div>
        </div>
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input
              type="checkbox"
              class="is-switch"
              :checked="!hasNotificationEnabled"
              @click="toggleDisable"
            />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Disable</span>
            <span>Disable all notifications</span>
          </div>
        </div>
      </div>

      <div class="restore-defaults has-text-centered">
        <button class="button" @click="restore">
          <span class="icon is-small">
            <RotateCwIcon />
          </span>
          <span>Restore Defaults</span>
        </button>
      </div>
    </div>
  </div>
</template>
