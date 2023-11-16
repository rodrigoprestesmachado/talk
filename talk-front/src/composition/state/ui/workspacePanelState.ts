/**
 * WorkspacePanelState Composition API
 */

import { computed, reactive, ref } from 'vue'

type PanelID = 'people' | 'activity' | 'notes' | 'user-details'

/* WorkspacePanelState internal data */

const internalPanelData = reactive({
  data: null,
} as { data: any })

/* WorkspacePanelState data */

export const currentPanelId = ref<PanelID>('people')
export const currentPanelData = computed(() => {
  return internalPanelData.data
})

/* WorkspacePanelState mutations */

export function openPanel(panelId: PanelID, panelData: any = null) {
  currentPanelId.value = panelId
  internalPanelData.data = panelData
}
