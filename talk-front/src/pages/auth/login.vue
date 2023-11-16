<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MailIcon, LockIcon } from '@zhuowenli/vue-feather-icons'
import { useToast, POSITION } from 'vue-toastification'

import { useLogin } from '/@src/composition/use/useLogin'

const ReEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginPage = defineComponent({
  name: 'LoginPage',
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
          position: POSITION.BOTTOM_RIGHT,
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

export default LoginPage
</script>

<template>
  <!-- Wrapper -->
  <div class="auth-wrapper columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-8 is-hidden-mobile hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="has-light-shadow"
                src="/img/illustrations/screen-1.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
      <div class="hero is-fullheight">
        <div class="hero-heading">
          <div class="auth-logo">
            <RouterLink :to="{ name: 'index' }"
              ><img class="top-logo" src="/img/logo/moebius.svg" alt=""
            /></RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>Welcome Back.</h2>
                  <p>Please sign in to your account</p>
                  <RouterLink :to="{ name: 'auth-signup' }"
                    >I do not have an account yet
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <!-- Login Form -->
                  <form @submit.prevent="loginHandler">
                    <div id="signin-form" class="login-form">
                      <!-- Input -->
                      <div class="field">
                        <div class="control has-icon">
                          <input
                            v-model="email"
                            class="input"
                            type="text"
                            placeholder="Email"
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
                            autocomplete="current-password"
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

                      <RouterLink
                        :to="{ name: 'auth-forgot-password' }"
                        class="forgot-link has-text-centered"
                      >
                        <a>Forgot Password?</a>
                      </RouterLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
