<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  Trash2Icon,
  ArchiveIcon,
  UsersIcon,
  BellIcon,
  SlidersIcon,
  BriefcaseIcon,
  SettingsIcon,
} from '@zhuowenli/vue-feather-icons'

import { useDropdown } from '/@src/composition/use/useDropdown'
import { openDrawer } from '/@src/composition/state/ui/workspaceDrawerState'
import { openModal } from '/@src/composition/state/ui/workspaceModalState'

const WorkspaceSettingsDropdown = defineComponent({
  name: 'WorkspaceSettingsDropdown',
  components: {
    Trash2Icon,
    ArchiveIcon,
    UsersIcon,
    BellIcon,
    SlidersIcon,
    BriefcaseIcon,
    SettingsIcon,
  },
  setup() {
    // WorkspaceSettingsDropdown - Composition API

    const { dropdownElement, isOpen, toggle } = useDropdown()

    return {
      openDrawer,
      openModal,
      dropdownElement,
      isOpen,
      toggle,
    }
  },
})

export default WorkspaceSettingsDropdown
</script>

<template>
  <div
    ref="dropdownElement"
    class="dropdown is-spaced is-right dropdown-trigger"
    :class="[isOpen && 'is-active']"
  >
    <button
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="toggle"
    >
      <a class="chat-nav-item is-icon">
        <SettingsIcon />
      </a>
    </button>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div class="dropdown-item is-header">
          <h5>Settings</h5>
        </div>
        <a
          class="dropdown-item"
          @click="
            () => {
              openDrawer('workspace-details')
              toggle()
            }
          "
        >
          <div class="media">
            <BriefcaseIcon />
            <div class="media-content">
              <h3>Workspaces</h3>
              <small>View your workspaces.</small>
            </div>
          </div>
        </a>
        <a
          class="dropdown-item"
          @click="
            () => {
              openDrawer('workspace-settings')
              toggle()
            }
          "
        >
          <div class="media">
            <SlidersIcon />
            <div class="media-content">
              <h3>Settings</h3>
              <small>Edit workspace settings.</small>
            </div>
          </div>
        </a>
        <hr class="dropdown-divider" />
        <a
          class="dropdown-item"
          @click="
            () => {
              openDrawer('notifications-settings')
              toggle()
            }
          "
        >
          <div class="media">
            <BellIcon />
            <div class="media-content">
              <h3>Notifications</h3>
              <small>Set notifications settings.</small>
            </div>
          </div>
        </a>
        <a
          class="dropdown-item"
          @click="
            () => {
              openDrawer('workspace-members')
              toggle()
            }
          "
        >
          <div class="media">
            <UsersIcon />
            <div class="media-content">
              <h3>Members</h3>
              <small>Manage workspace members.</small>
            </div>
          </div>
        </a>
        <hr class="dropdown-divider" />
        <a
          class="dropdown-item"
          @click="
            () => {
              openModal('archive-conversation')
              toggle()
            }
          "
        >
          <div class="media">
            <ArchiveIcon />
            <div class="media-content">
              <h3>Archive</h3>
              <small>Archive this conversation.</small>
            </div>
          </div>
        </a>
        <a
          class="dropdown-item"
          @click="
            () => {
              openModal('delete-conversation')
              toggle()
            }
          "
        >
          <div class="media">
            <Trash2Icon />
            <div class="media-content">
              <h3>Delete</h3>
              <small>Delete this conversation.</small>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
