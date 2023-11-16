/**
 * RightMenuState Composition API
 */

import { ref } from 'vue'

/* RightMenuState data */

export const isOpen = ref(false)

/* RightMenuState mutations */

export function toggle() {
  isOpen.value = !isOpen.value
}
