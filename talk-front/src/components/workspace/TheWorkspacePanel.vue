<script lang="ts">
import { defineComponent } from 'vue'

import {
  openPanel,
  currentPanelId,
  currentPanelData,
} from '/@src/composition/state/ui/workspacePanelState'
import { isOpen as isMobileRightNavOpen } from '/@src/composition/state/ui/mobileRightNavState'

import ActivityPanel from '/@src/components/workspace/panels/ActivityPanel.vue'
import NotesPanel from '/@src/components/workspace/panels/NotesPanel.vue'
import PeoplePanel from '/@src/components/workspace/panels/PeoplePanel.vue'
import UserPanel from '/@src/components/workspace/panels/UserPanel.vue'

const TheWorkspacePanel = defineComponent({
  name: 'TheWorkspacePanel',
  components: {
    ActivityPanel,
    NotesPanel,
    PeoplePanel,
    UserPanel,
  },
  setup() {
    // TheWorkspacePanel - Composition API

    return {
      openPanel,
      currentPanelId,
      currentPanelData,
      isMobileRightNavOpen,
    }
  },
})

export default TheWorkspacePanel
</script>

<template>
  <div class="chat-panel is-opened" :class="[isMobileRightNavOpen && 'is-mobile-opened']">
    <div class="panel-inner">
      <!-- active tab indicator -->
      <div class="panel-header">
        <div class="nav">
          <a
            class="nav-link"
            :class="[currentPanelId === 'people' && 'active']"
            @click="openPanel('people')"
            >People</a
          >
          <a
            class="nav-link"
            :class="[currentPanelId === 'activity' && 'active']"
            @click="openPanel('activity')"
            >Activity</a
          >
          <div class="nav-naver"></div>
        </div>
        <a
          v-if="currentPanelId !== 'people'"
          class="has-text-primary"
          @click="openPanel('people')"
        >
          <i class="material-icons">close</i>
        </a>
      </div>

      <!-- People tab -->
      <PeoplePanel :class="[currentPanelId !== 'people' && 'is-hidden']" />

      <!-- Activity tab -->
      <ActivityPanel :class="[currentPanelId !== 'activity' && 'is-hidden']" />

      <!-- Notes tab -->
      <NotesPanel :class="[currentPanelId !== 'notes' && 'is-hidden']" />

      <!-- User details -->
      <UserPanel
        :class="[currentPanelId !== 'user-details' && 'is-hidden']"
        :user-id="(currentPanelId === 'user-details' && currentPanelData) || ''"
      />
    </div>
  </div>
</template>
