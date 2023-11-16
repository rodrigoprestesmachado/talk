/**
 * useDropdown Composition API
 */

import { ref, watch } from 'vue'

/**
 * Generate refs to handle a dropdown state
 */
export function useDropdown() {
  const isOpen = ref(false)
  const dropdownElement = ref<HTMLElement | null>(null)

  const onClickListener = (event: MouseEvent) => {
    if (!dropdownElement.value) {
      return
    }

    // check if document click targets our dropdown
    const isClickInside = dropdownElement.value.contains(event.target as Node)

    // close dropdown if click is outside our container
    if (!isClickInside) {
      isOpen.value = false
    }
  }

  // register outside click listeners only if dropdown is open
  watch(isOpen, () => {
    if (!isOpen.value) {
      // clear outside click listeners if dropdown is closed
      document.removeEventListener('click', onClickListener)
    }

    // register document click listener
    document.addEventListener('click', onClickListener)
  })

  return {
    dropdownElement,
    isOpen,
    open() {
      isOpen.value = true
    },
    close() {
      isOpen.value = false
    },
    toggle() {
      isOpen.value = !isOpen.value
    },
  }
}
