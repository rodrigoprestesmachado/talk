/**
 * useLogin Composition API
 */

import { ref, computed } from 'vue'

import { loginUser } from '/@src/composition/state/user/authState'

const ReEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type LoginPayload = {
  onComplete?: () => void
  onError?: (error: Error) => void
}

/**
 * Generate refs to handle a login
 */
export function useLogin({ onComplete, onError }: LoginPayload = {}) {
  const email = ref('helenmiller@moebius.io')
  const password = ref('password')
  const remember = ref(false)
  const loading = ref(false)

  const isEmailValid = computed(() => email.value.length > 0 && ReEmail.test(email.value))

  const loginHandler = async () => {
    if (loading.value || !isEmailValid.value || password.value.length === 0) {
      return
    }

    loading.value = true

    try {
      // login user
      await loginUser(email.value, password.value)

      if (remember.value) {
        // store auth token to cookies
      }

      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      // handle login failed
      loading.value = false

      if (onError) {
        onError(error)
      }
    }
  }

  return {
    // state
    email,
    password,
    remember,
    loading,

    // computed
    isEmailValid,

    // actions
    loginHandler,
  }
}
