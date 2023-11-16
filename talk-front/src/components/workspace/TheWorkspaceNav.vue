<script lang="ts">
import { ref, defineComponent } from 'vue'
import { SunIcon, MoonIcon, SearchIcon } from '@zhuowenli/vue-feather-icons'

import { isEnabled as isDarkModeEnabled } from '/@src/composition/state/ui/darkModeState'
import {
  isOpen as isMobileLeftNavOpen,
  toggle as toggleMobileLeftNav,
} from '/@src/composition/state/ui/mobileLeftNavState'
import {
  isOpen as isMobileRightNavOpen,
  toggle as toggleMobileRightNav,
} from '/@src/composition/state/ui/mobileRightNavState'
import { activeConversation } from '/@src/composition/state/workspace/activeConversationState'
import { getUser, getUserAvatar } from '/@src/composition/state/user/authState'

import WorkspaceSettingsDropdown from '/@src/components/workspace/dropdowns/WorkspaceSettingsDropdown.vue'
import UserSettingsDropdown from '/@src/components/workspace/dropdowns/UserSettingsDropdown.vue'

const TheWorkspaceNav = defineComponent({
  name: 'TheWorkspaceNav',
  components: {
    WorkspaceSettingsDropdown,
    UserSettingsDropdown,
    SunIcon,
    MoonIcon,
    SearchIcon,
  },
  setup() {
    // TheWorkspaceNav - Composition API

    return {
      isDarkModeEnabled,
      getUser,
      getUserAvatar,
      activeConversation,
      isMobileLeftNavOpen,
      isMobileRightNavOpen,
      toggleMobileLeftNav,
      toggleMobileRightNav,
    }
  },
})

export default TheWorkspaceNav
</script>

<template>
  <div class="chat-nav" :class="[isMobileLeftNavOpen && 'is-mobile-active']">
    <div class="nav-start">
      <!-- mobile left panel handler -->
      <div class="nav-item burger-wrapper">
        <button
          class="menu-icon v-5"
          :class="[isMobileLeftNavOpen && 'is-open']"
          @click="toggleMobileLeftNav"
        >
          <span></span>
        </button>
      </div>

      <!-- user conversations list -->
      <div
        v-if="activeConversation && activeConversation.participantIds.length"
        class="recipient-block"
      >
        <template
          v-for="participantId in activeConversation.participantIds"
          :key="participantId"
        >
          <div
            v-if="participantId !== activeConversation.ownerId"
            class="avatar-container"
          >
            <img
              class="user-avatar"
              loading="lazy"
              :src="getUserAvatar(participantId)"
              alt=""
              @error="$event.target.src = 'https://via.placeholder.com/32x32'"
            />
          </div>
        </template>

        <!-- active conversation participants -->
        <div class="avatar-container">
          <img
            class="user-avatar"
            loading="lazy"
            :src="getUserAvatar(activeConversation.ownerId)"
            alt=""
            @error="$event.target.src = 'https://via.placeholder.com/32x32'"
          />
        </div>
        <div class="username">
          <span>{{ getUser(activeConversation.ownerId).nickname }}</span>
          <span
            ><var>{{ activeConversation.participantIds.length }}</var> participants</span
          >
        </div>
      </div>
    </div>

    <div class="nav-end">
      <!-- dark theme switcher -->
      <div class="toggle-wrapper">
        <div class="ninja-toggle">
          <input id="theme-toggle" v-model="isDarkModeEnabled" type="checkbox" />
          <label for="theme-toggle" class="no-margin">
            <span class="track">
              <span class="track-inner"></span>
              <span class="track-knob">
                <SunIcon class="sun" />
                <MoonIcon class="moon" />
              </span>
            </span>
          </label>
        </div>
      </div>

      <!-- chat messages search -->
      <div class="chat-search">
        <div class="control has-icon">
          <input type="text" class="input" placeholder="Search messages" />
          <div class="form-icon">
            <SearchIcon />
          </div>
        </div>
      </div>

      <!-- chat settings dropdown -->
      <WorkspaceSettingsDropdown />

      <div class="chat-nav-item is-spacer is-hidden-mobile"></div>

      <!-- user dropdown -->
      <UserSettingsDropdown />

      <!-- mobile right panel handler -->
      <div class="nav-item burger-wrapper-right">
        <button
          class="menu-icon v-4"
          :class="[isMobileRightNavOpen && 'is-open']"
          @click="toggleMobileRightNav"
        >
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>
