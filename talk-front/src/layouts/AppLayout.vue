<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useToast, POSITION } from 'vue-toastification'

import { isAuthenticated } from '/@src/composition/state/user/authState'

const AppLayout = defineComponent({
  name: 'AppLayout',
  setup() {
    // AppLayout - Composition API

    const router = useRouter()
    const toast = useToast()

    // first page load - auth check
    if (!isAuthenticated.value) {
      router.push({
        name: 'auth-login',
      })

      toast.error('Login required to access workspace', {
        timeout: 2000,
        position: POSITION.BOTTOM_RIGHT,
      })

      return {}
    }

    // page change - auth check
    onBeforeRouteUpdate((to, from) => {
      if (!isAuthenticated.value) {
        return false
      }

      return true
    })
  },
})

export default AppLayout
</script>

<template>
  <RouterView />
</template>
