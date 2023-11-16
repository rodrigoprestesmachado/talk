<script lang="ts">
import { defineComponent } from 'vue'
import { SettingsIcon, PlusIcon } from '@zhuowenli/vue-feather-icons'

import { openDrawer, closeDrawer } from '/@src/composition/state/ui/workspaceDrawerState'

const WorkspaceDetailsDrawer = defineComponent({
  name: 'WorkspaceDetailsDrawer',
  components: {
    SettingsIcon,
    PlusIcon,
  },
  emits: ['close'],
  setup() {
    // WorkspaceDetailsDrawer - Composition API

    return {
      openDrawer,
      closeDrawer,
    }
  },
})

export default WorkspaceDetailsDrawer
</script>

<template>
  <div id="workspace-details-panel" class="slide-panel is-right is-small">
    <div class="slide-panel-header">
      <h3>My Workspaces</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body">
      <!--Workspaces-->
      <div class="workspaces-list">
        <!--Item-->
        <div class="workspace-item is-active">
          <div class="item-icon">
            <img src="/img/logo/moebius.svg" alt="" />
            <div class="indicator"></div>
          </div>
          <div class="item-meta">
            <span>Moebius Team</span>
            <span>Created 3 months ago</span>
          </div>
          <div class="item-settings">
            <button class="button" @click="openDrawer('workspace-settings')">
              <SettingsIcon />
            </button>
          </div>
        </div>
        <!--Item-->
        <div class="workspace-item">
          <div class="item-icon is-colored is-info">
            <span>SP</span>
            <div class="indicator"></div>
          </div>
          <div class="item-meta">
            <span>SoftPro Team</span>
            <span>Created 5 months ago</span>
          </div>
          <div class="item-settings">
            <button class="button" @click="openDrawer('workspace-settings')">
              <SettingsIcon />
            </button>
          </div>
        </div>
        <!--Item-->
        <div class="workspace-item">
          <div class="item-icon is-colored is-success">
            <span>DB</span>
            <div class="indicator"></div>
          </div>
          <div class="item-meta">
            <span>Design Box Team</span>
            <span>Created 6 months ago</span>
          </div>
          <div class="item-settings">
            <button class="button" @click="openDrawer('workspace-settings')">
              <SettingsIcon />
            </button>
          </div>
        </div>
        <!--Item-->
        <div class="workspace-item">
          <div class="item-icon is-colored is-purple">
            <span>ME</span>
            <div class="indicator"></div>
          </div>
          <div class="item-meta">
            <span>Metricer Team</span>
            <span>Created 6 months ago</span>
          </div>
          <div class="item-settings">
            <button class="button" @click="openDrawer('workspace-settings')">
              <SettingsIcon />
            </button>
          </div>
        </div>
        <!--Item-->
        <RouterLink :to="{ name: 'workspace-create' }" class="add-workspace">
          <div class="item-icon is-add">
            <PlusIcon />
          </div>
          <div class="item-meta">
            <span>Add Workspace</span>
            <span>Create a new workspace</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
