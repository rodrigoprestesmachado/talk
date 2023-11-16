<script lang="ts">
import { defineComponent } from 'vue'

import {
  currentDrawerId,
  closeDrawer,
} from '/@src/composition/state/ui/workspaceDrawerState'

import MyFilesDrawer from '/@src/components/workspace/drawers/MyFilesDrawer.vue'
import NewConversationDrawer from '/@src/components/workspace/drawers/NewConversationDrawer.vue'
import NotificationsSettingsDrawer from '/@src/components/workspace/drawers/NotificationsSettingsDrawer.vue'
import SharedFilesDrawer from '/@src/components/workspace/drawers/SharedFilesDrawer.vue'
import WorkspaceDetailsDrawer from '/@src/components/workspace/drawers/WorkspaceDetailsDrawer.vue'
import WorkspaceMembersDrawer from '/@src/components/workspace/drawers/WorkspaceMembersDrawer.vue'
import WorkspaceSettingsDrawer from '/@src/components/workspace/drawers/WorkspaceSettingsDrawer.vue'

const TheDrawerHandler = defineComponent({
  name: 'TheDrawerHandler',
  components: {
    MyFilesDrawer,
    NewConversationDrawer,
    NotificationsSettingsDrawer,
    SharedFilesDrawer,
    WorkspaceDetailsDrawer,
    WorkspaceMembersDrawer,
    WorkspaceSettingsDrawer,
  },
  setup() {
    // TheDrawerHandler - Composition API

    return {
      currentDrawerId,
      closeDrawer,
    }
  },
})

export default TheDrawerHandler
</script>

<template>
  <div
    class="slide-panel-overlay"
    :class="[currentDrawerId !== '' && 'is-active']"
    @click="closeDrawer()"
  ></div>

  <MyFilesDrawer
    :class="[currentDrawerId === 'my-files' && 'is-opened']"
    @close="closeDrawer()"
  />
  <NewConversationDrawer
    :class="[currentDrawerId === 'new-conversation' && 'is-opened']"
    @close="closeDrawer()"
  />
  <NotificationsSettingsDrawer
    :class="[currentDrawerId === 'notifications-settings' && 'is-opened']"
    @close="closeDrawer()"
  />
  <SharedFilesDrawer
    :class="[currentDrawerId === 'shared-files' && 'is-opened']"
    @close="closeDrawer()"
  />
  <WorkspaceDetailsDrawer
    :class="[currentDrawerId === 'workspace-details' && 'is-opened']"
    @close="closeDrawer()"
  />
  <WorkspaceMembersDrawer
    :class="[currentDrawerId === 'workspace-members' && 'is-opened']"
    @close="closeDrawer()"
  />
  <WorkspaceSettingsDrawer
    :class="[currentDrawerId === 'workspace-settings' && 'is-opened']"
    @close="closeDrawer()"
  />
</template>
