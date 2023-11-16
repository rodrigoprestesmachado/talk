<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserIcon, MailIcon, LockIcon } from '@zhuowenli/vue-feather-icons'
import { useToast, POSITION } from 'vue-toastification'

import { useSignup } from '/@src/composition/use/useSignup'

const Signup2Page = defineComponent({
  name: 'Signup2Page',
  components: {
    UserIcon,
    MailIcon,
    LockIcon,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()

    const {
      email,
      username,
      password,
      passwordConfirm,
      receiveOffers,
      loading,
      isSignupValid,
      signupHandler,
    } = useSignup({
      onComplete: () => {
        router.push({
          name: 'workspace',
          params: {
            slug: 'my-workspace',
          },
        })
      },
      onError: (error) => {
        // hint: use shouldfail as password to force login to fail
        console.log(error)

        toast.error('email already taken', {
          timeout: 4000,
          position: POSITION.BOTTOM_CENTER,
        })
      },
    })

    onMounted(() => {
      document.title = 'Moebius :: Register new account'
    })

    return {
      email,
      username,
      password,
      passwordConfirm,
      receiveOffers,
      loading,
      isSignupValid,
      signupHandler,
    }
  },
})

export default Signup2Page
</script>

<template>
  <div class="auth-wrapper is-single">
    <!--Navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <img src="/img/logo/moebius.svg" alt="" />
        </RouterLink>
      </div>
      <div class="right"></div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
        <div class="auth-head">
          <h2>Join Us Now.</h2>
          <p>Start by creating your account</p>
          <RouterLink :to="{ name: 'auth-login-2' }"
            >I already have an account
          </RouterLink>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="signupHandler">
            <div id="signin-form" class="login-form">
              <!-- Input -->
              <div class="field">
                <div class="control has-icon">
                  <input
                    v-model="username"
                    class="input"
                    type="text"
                    placeholder="Username"
                    autocomplete="name"
                  />
                  <span class="form-icon">
                    <UserIcon />
                  </span>
                </div>
              </div>
              <!-- Input -->
              <div class="field">
                <div class="control has-icon">
                  <input
                    v-model="email"
                    class="input"
                    type="text"
                    placeholder="Email Address"
                    autocomplete="email"
                  />
                  <span class="form-icon">
                    <MailIcon />
                  </span>
                </div>
              </div>
              <!-- Input -->
              <div class="field">
                <div class="control has-icon">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                  <span class="form-icon">
                    <LockIcon />
                  </span>
                </div>
              </div>
              <!-- Input -->
              <div class="field">
                <div class="control has-icon">
                  <input
                    v-model="passwordConfirm"
                    class="input"
                    type="password"
                    placeholder="Repeat Password"
                  />
                  <span class="form-icon">
                    <LockIcon />
                  </span>
                </div>
              </div>

              <div class="setting-item">
                <label class="form-switch is-primary">
                  <input
                    id="busy-mode-toggle"
                    v-model="receiveOffers"
                    type="checkbox"
                    class="is-switch"
                  />
                  <i></i>
                </label>
                <div class="setting-meta">
                  <span>Receive promotional offers</span>
                </div>
              </div>

              <!-- Submit -->
              <div class="control login">
                <button
                  type="submit"
                  :disabled="loading || !isSignupValid"
                  class="button is-primary is-bold is-fullwidth raised"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
