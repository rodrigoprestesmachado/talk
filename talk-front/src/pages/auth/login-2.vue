<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MailIcon, LockIcon } from '@zhuowenli/vue-feather-icons'
import { useToast, POSITION } from 'vue-toastification'

import { useLogin } from '/@src/composition/use/useLogin'

const ReEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login2Page = defineComponent({
  name: 'Login2Page',
  components: {
    MailIcon,
    LockIcon,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()

    const { email, password, remember, loading, isEmailValid, loginHandler } = useLogin({
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

        toast.error('wrong credentials', {
          timeout: 4000,
          position: POSITION.BOTTOM_CENTER,
        })
      },
    })

    onMounted(() => {
      document.title = 'Moebius :: Login to your workspace'
    })

    return {
      email,
      isEmailValid,
      password,
      remember,
      loading,
      loginHandler,
    }
  },
})

export default Login2Page
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
          <h2>Welcome Back.</h2>
          <p>Please sign in to your account</p>
          <RouterLink :to="{ name: 'auth-signup-2' }"
            >I do not have an account yet</RouterLink
          >
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="loginHandler">
            <div id="signin-form" class="login-form">
              <!-- Input -->
              <div class="field">
                <div class="control has-icon">
                  <input v-model="email" class="input" type="text" placeholder="Email" />
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
                    v-model="remember"
                    type="checkbox"
                    class="is-switch"
                  />
                  <i></i>
                </label>
                <div class="setting-meta">
                  <span>Remember Me</span>
                </div>
              </div>

              <!-- Submit -->
              <div class="control login">
                <button
                  type="submit"
                  :disabled="!isEmailValid || password.length === 0"
                  class="button is-primary is-bold is-fullwidth raised hint--top hint--rounded"
                  data-hint="use any email/password to login"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>

        <RouterLink
          :to="{ name: 'auth-forgot-password' }"
          class="forgot-link has-text-centered"
        >
          <a>Forgot Password?</a>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
