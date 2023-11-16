/**
 * useSignup Composition API
 */

import { ref, computed } from 'vue'

import { registerUser } from '/@src/composition/state/user/authState'

const ReEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type SignupPayload = {
  onComplete?: () => void
  onError?: (error: Error) => void
}

/**
 * Generate refs to handle a login
 */
export function useSignup({ onComplete, onError }: SignupPayload = {}) {
  const email = ref('helenmiller@moebius.io')
  const username = ref('Helen Miller')
  const password = ref('password')
  const passwordConfirm = ref('password')
  const receiveOffers = ref(false)
  const loading = ref(false)

  const isEmailValid = computed(() => email.value.length > 0 && ReEmail.test(email.value))

  const isPasswordValid = computed(
    () => password.value.length >= 6 && password.value === passwordConfirm.value
  )

  const isSignupValid = computed(
    () => username.value.length > 0 && isEmailValid.value && isPasswordValid.value
  )

  const signupHandler = async () => {
    if (loading.value || !isSignupValid.value) {
      return
    }

    loading.value = true

    try {
      await registerUser({
        username: username.value,
        email: email.value,
        password: password.value,
        receiveOffers: receiveOffers.value,
      })

      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      loading.value = false

      if (onError) {
        onError(error)
      }
    }
  }

  return {
    // state
    email,
    username,
    password,
    passwordConfirm,
    receiveOffers,
    loading,

    // computed
    isEmailValid,
    isPasswordValid,
    isSignupValid,

    // actions
    signupHandler,
  }
}
