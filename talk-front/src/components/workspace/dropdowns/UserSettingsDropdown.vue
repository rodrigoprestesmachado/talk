<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import {
  FileTextIcon,
  Share2Icon,
  PlusIcon,
  LogOutIcon,
} from '@zhuowenli/vue-feather-icons'

import { useDropdown } from '/@src/composition/use/useDropdown'
import { openDrawer } from '/@src/composition/state/ui/workspaceDrawerState'
import { isEnabled as isDarkModeEnabled } from '/@src/composition/state/ui/darkModeState'
import {
  getLoggedUserAvatar,
  logoutUser,
  getLoggedUser,
} from '/@src/composition/state/user/authState'

const UserSettingsDropdown = defineComponent({
  name: 'UserSettingsDropdown',
  components: {
    FileTextIcon,
    Share2Icon,
    PlusIcon,
    LogOutIcon,
  },
  setup() {
    // UserSettingsDropdown - Composition API

    const { dropdownElement, isOpen, toggle } = useDropdown()

    return {
      openDrawer,
      getLoggedUser,
      getLoggedUserAvatar,
      logoutUser,
      isDarkModeEnabled,
      dropdownElement,
      isOpen,
      toggle,
    }
  },
})

export default UserSettingsDropdown
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
      <a
        class="chat-nav-item is-account"
        :class="[getLoggedUser.status === 'busy' && 'is-busy']"
      >
        <img
          class="user-avatar"
          loading="lazy"
          :src="getLoggedUserAvatar"
          alt=""
          @error="$event.target.src = 'https://via.placeholder.com/32x32'"
        />
        <div class="indicator"></div>
      </a>
    </button>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div class="dropdown-item is-header mb-16">
          <h5 class="is-narrow">Helen Miller</h5>
          <span>helenmiller@moebius.io</span>
        </div>
        <div class="dropdown-item no-hover">
          <div class="setting-item">
            <label class="form-switch is-danger">
              <input
                id="busy-mode-toggle"
                :checked="getLoggedUser.status === 'busy'"
                type="checkbox"
                class="is-switch"
                @click="
                  () => {
                    if (getLoggedUser.status === 'busy') {
                      getLoggedUser.status = 'online'
                    } else {
                      getLoggedUser.status = 'busy'
                    }
                  }
                "
              />
              <i></i>
            </label>
            <div class="setting-meta">
              <span>Busy Mode</span>
              <span>Sets your status to busy</span>
            </div>
          </div>
        </div>
        <hr class="dropdown-divider" />
        <a
          class="dropdown-item"
          @click="
            () => {
              openDrawer('my-files')
              toggle()
            }
          "
        >
          <div class="media">
            <FileTextIcon />
            <div class="media-content">
              <h3>My Files</h3>
              <small>View all your files.</small>
            </div>
          </div>
        </a>
        <a
          class="dropdown-item"
          @click="
            () => {
              openDrawer('shared-files')
              toggle()
            }
          "
        >
          <div class="media">
            <Share2Icon />
            <div class="media-content">
              <h3>Shared Files</h3>
              <small>Files shared with me.</small>
            </div>
          </div>
        </a>
        <hr class="dropdown-divider" />
        <RouterLink :to="{ name: 'workspace-create' }" class="dropdown-item">
          <div class="media">
            <PlusIcon />
            <div class="media-content">
              <h3>Add Workspace</h3>
              <small>Create a new workspace.</small>
            </div>
          </div>
        </RouterLink>
        <hr class="dropdown-divider" />
        <RouterLink
          :to="{ name: 'auth-login' }"
          class="dropdown-item"
          @click="
            () => {
              isDarkModeEnabled = false
              logoutUser()
            }
          "
        >
          <div class="media">
            <LogOutIcon />
            <div class="media-content">
              <h3>Logout</h3>
              <small>Logout from your account</small>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
