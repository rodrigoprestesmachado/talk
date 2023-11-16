<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserIcon, MailIcon, LockIcon } from '@zhuowenli/vue-feather-icons'
import { useToast, POSITION } from 'vue-toastification'

import { useSignup } from '/@src/composition/use/useSignup'

const SignupPage = defineComponent({
  name: 'SignupPage',
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
          position: POSITION.BOTTOM_LEFT,
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

export default SignupPage
</script>

<template>
  <!-- Wrapper -->
  <div class="auth-wrapper columns is-gapless">
    <!-- Form section -->
    <div class="column is-5">
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
                  <h2>Join Us Now.</h2>
                  <p>Start by creating your account</p>
                  <RouterLink :to="{ name: 'auth-login' }"
                    >I already have an account
                  </RouterLink>
                </div>

                <div class="auth-form-wrapper">
                  <!-- Login Form -->
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
                          type="sumbit"
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
        </div>
      </div>
    </div>

    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-7 is-hidden-mobile hero-banner">
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
  </div>
</template>
