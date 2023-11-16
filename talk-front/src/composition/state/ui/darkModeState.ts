/**
 * DarkModeState Composition API
 */

import { ref, watch } from 'vue'

const DARK_MODE_CSS = 'is-dark'

/* DarkModeState data */

export const isEnabled = ref(false)

// update body classList when state changed
watch(
  isEnabled,
  () => {
    const body = document.body

    if (isEnabled.value) {
      body.classList.add(DARK_MODE_CSS)
    } else {
      body.classList.remove(DARK_MODE_CSS)
    }
  },
  {
    immediate: true,
  }
)
