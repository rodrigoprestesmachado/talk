<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PlusIcon, Trash2Icon } from '@zhuowenli/vue-feather-icons'

import { closeDrawer } from '/@src/composition/state/ui/workspaceDrawerState'
import { openModal } from '/@src/composition/state/ui/workspaceModalState'

const WorkspaceSettingsDrawer = defineComponent({
  name: 'WorkspaceSettingsDrawer',
  components: {
    PlusIcon,
    Trash2Icon,
  },
  emits: ['close'],
  setup() {
    // WorkspaceSettingsDrawer - Composition API

    const isPrivate = ref(false)
    const allowFileSharing = ref(true)
    const allowInvitations = ref(true)
    const enable2FA = ref(false)

    return {
      closeDrawer,
      openModal,
      isPrivate,
      allowFileSharing,
      allowInvitations,
      enable2FA,
    }
  },
})

export default WorkspaceSettingsDrawer
</script>

<template>
  <div id="workspace-settings-panel" class="slide-panel is-right is-small">
    <div class="slide-panel-header">
      <h3>Workspace Settings</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body">
      <!--Avatar-->
      <div class="workspace-avatar">
        <div class="avatar-icon">
          <img src="/img/logo/moebius.svg" alt="" />

          <button class="button">
            <PlusIcon />
          </button>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Workspace Name" value="Moebius Team" />
          </div>
          <p>Click to edit the workspace name</p>
        </div>
      </div>

      <!--Settings-->
      <div class="setting-list">
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="isPrivate" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Privacy</span>
            <span>Make this workspace private</span>
          </div>
        </div>
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="allowFileSharing" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>File Sharing</span>
            <span>Enable/Disable file sharing</span>
          </div>
        </div>
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="allowInvitations" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Invitations</span>
            <span>Allow public invitations</span>
          </div>
        </div>
        <!--Setting-->
        <div class="setting-item">
          <label class="form-switch is-primary">
            <input v-model="enable2FA" type="checkbox" class="is-switch" />
            <i></i>
          </label>
          <div class="setting-meta">
            <span>Two Factor</span>
            <span>Enable 2 factor auth</span>
          </div>
        </div>
      </div>

      <div class="delete-workspace has-text-centered">
        <a
          class="button"
          @click="
            () => {
              closeDrawer()
              openModal('delete-conversation')
            }
          "
        >
          <span class="icon is-small">
            <Trash2Icon />
          </span>
          <span>Delete Workspace</span>
        </a>
      </div>
    </div>
  </div>
</template>
