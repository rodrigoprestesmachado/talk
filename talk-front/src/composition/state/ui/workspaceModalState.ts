/**
 * WorkspaceModalState Composition API
 */

import { ref, reactive, computed } from 'vue'

type ModalID =
  | ''
  | 'new-conversation'
  | 'archive-conversation'
  | 'delete-conversation'
  | 'call'
  | 'upload-file'

/* WorkspaceModalState data */

/* WorkspaceModalState internal data */

const internalModalData = reactive({
  data: null,
} as { data: any })

/* WorkspaceModalState data */

export const currentModalId = ref<ModalID>('')
export const currentModalData = computed(() => {
  return internalModalData.data
})

/* WorkspaceModalState mutations */

export function openModal(modalId: ModalID, modalData: any = null) {
  currentModalId.value = modalId
  internalModalData.data = modalData
}

export function closeModal() {
  currentModalId.value = ''
  internalModalData.data = null
}
