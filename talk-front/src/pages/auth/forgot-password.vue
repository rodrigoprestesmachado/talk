<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { MailIcon } from '@zhuowenli/vue-feather-icons'
import { useToast, POSITION } from 'vue-toastification'

const ReEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ForgotPasswordPage = defineComponent({
  name: 'ForgotPasswordPage',
  components: {
    MailIcon,
  },
  setup() {
    const email = ref('')
    const toast = useToast()

    const forgotPasswordHandler = () => {
      if (!email.value || !ReEmail.test(email.value)) {
        return
      }

      toast.success(`an email has been sent to ${email.value}`, {
        timeout: 4000,
        position: POSITION.BOTTOM_CENTER,
      })
    }

    onMounted(() => {
      document.title = 'Moebius :: Recover your password'
    })

    return {
      email,
      forgotPasswordHandler,
    }
  },
})

export default ForgotPasswordPage
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
          <h2>Forgot Password?</h2>
          <p>Enter your email and follow the instructions</p>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="forgotPasswordHandler">
            <div id="signin-form" class="login-form">
              <!-- Input -->
              <div class="field">
                <div class="control has-icon">
                  <input
                    v-model="email"
                    class="input"
                    type="text"
                    placeholder="Email Address"
                  />
                  <span class="form-icon">
                    <MailIcon />
                  </span>
                </div>
              </div>

              <!-- Submit -->
              <div class="control login">
                <button
                  type="submit"
                  class="button is-primary is-bold is-fullwidth raised"
                >
                  Recover Password
                </button>
              </div>
            </div>
          </form>
        </div>

        <!--Back-->
        <RouterLink :to="{ name: 'auth-login' }" class="forgot-link has-text-centered">
          <a>Go back to login</a>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
