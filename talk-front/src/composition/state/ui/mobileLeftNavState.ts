/**
 * LeftMenuState Composition API
 */

import { ref } from 'vue'

/* LeftMenuState data */

export const isOpen = ref(false)

/* LeftMenuState mutations */

export function toggle() {
  isOpen.value = !isOpen.value
}
