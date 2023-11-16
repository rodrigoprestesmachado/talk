/**
 * WorkspaceDrawerState Composition API
 */

import { ref } from 'vue'

type DrawerID =
  | ''
  | 'my-files'
  | 'shared-files'
  | 'new-conversation'
  | 'notifications-settings'
  | 'workspace-details'
  | 'workspace-members'
  | 'workspace-settings'

/* WorkspaceDrawerState data */

export const currentDrawerId = ref<DrawerID>('')

/* WorkspaceDrawerState mutations */

export function openDrawer(drawerId: DrawerID) {
  currentDrawerId.value = drawerId
}

export function closeDrawer() {
  currentDrawerId.value = ''
}
