<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast, POSITION } from 'vue-toastification'
import {
  PlusIcon,
  MailIcon,
  BriefcaseIcon,
  LockIcon,
  UserIcon,
  CheckIcon,
  XIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftIcon,
} from '@zhuowenli/vue-feather-icons'

import { isEnabled as isDarkModeEnabled } from '/@src/composition/state/ui/darkModeState'
import { useCreateWorkspace } from '/@src/composition/use/useCreateWorkspace'

const ReEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const WorkspaceCreatePage = defineComponent({
  name: 'WorkspaceCreatePage',
  components: {
    PlusIcon,
    MailIcon,
    BriefcaseIcon,
    LockIcon,
    UserIcon,
    CheckIcon,
    XIcon,
    MoonIcon,
    SunIcon,
    ArrowLeftIcon,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const step = ref(1)

    const { inputs, onAvatarChange, createWorkspace, addTeamEmail } = useCreateWorkspace({
      onComplete: () => {
        router.push({
          name: 'workspace',
          params: { slug: 'my-workspace' },
        })
      },
      onError: (error) => {
        console.log(error)

        step.value = 1

        toast.error('email already taken', {
          timeout: 4000,
          position: POSITION.BOTTOM_RIGHT,
        })
      },
    })

    const isStep1Valid = computed(
      () => inputs.email.length > 0 && ReEmail.test(inputs.email)
    )

    const isStep2Valid = computed(() => {
      if (
        inputs.firstName === '' ||
        inputs.lastName === '' ||
        inputs.password === '' ||
        inputs.password.length < 8
      ) {
        return false
      }

      return true
    })

    const isStep3Valid = computed(() => {
      if (inputs.company === '') {
        return false
      }

      return true
    })

    const isStep4Valid = computed(() => {
      for (const email of inputs.teamEmails) {
        if (email !== '' && !ReEmail.test(email)) {
          return false
        }
      }

      return true
    })

    onMounted(() => {
      document.title = 'Moebius :: Create your workspace'
    })

    return {
      step,
      inputs,
      isDarkModeEnabled,
      createWorkspace,
      onAvatarChange,
      addTeamEmail,
      isStep1Valid,
      isStep2Valid,
      isStep3Valid,
      isStep4Valid,
    }
  },
})

export default WorkspaceCreatePage
</script>

<template>
  <div class="wizard-wrapper">
    <!--Progress Bar-->
    <div class="wizard-progress">
      <progress
        id="wizard-progress-bar"
        class="progress is-small is-primary"
        :value="(step / 5) * 100"
        max="100"
      >
        {{ (step / 5) * 100 }}%
      </progress>
    </div>

    <!-- Wizard navigation-->
    <div class="wizard-nav">
      <div class="left">
        <RouterLink v-if="step === 1" :to="{ name: 'index' }" class="back-button">
          <ArrowLeftIcon />
        </RouterLink>
        <button v-else class="back-button" @click="--step">
          <ArrowLeftIcon />
        </button>
      </div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <img src="/img/logo/moebius.svg" alt="" />
        </RouterLink>
      </div>
      <div class="right">
        <div class="toggle-wrapper">
          <div class="ninja-toggle">
            <input id="theme-toggle" v-model="isDarkModeEnabled" type="checkbox" />
            <label for="theme-toggle" class="no-margin">
              <span class="track">
                <span class="track-inner"></span>
                <span class="track-knob">
                  <SunIcon class="sun" />
                  <MoonIcon class="moon" />
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!--Wizard steps-->
    <div class="wizard-inner">
      <!--Step 1-->
      <div :class="[step === 1 && 'is-active']" class="wizard-step">
        <div class="step-inner">
          <h2>Create a new workspace and start by inviting your team</h2>
          <p>Only work teamEmails are allowed. Please make sure to use a work email.</p>

          <div class="email-form">
            <div class="field">
              <div class="control has-icon has-validation">
                <input
                  v-model="inputs.email"
                  class="input"
                  placeholder="Work email address"
                />
                <div class="form-icon">
                  <MailIcon />
                </div>
                <div class="validation-icon is-error is-hidden">
                  <XIcon />
                </div>
                <div class="validation-icon is-success is-hidden">
                  <CheckIcon />
                </div>
              </div>
            </div>
            <div class="submit-wrap">
              <button
                :disabled="!isStep1Valid"
                class="button is-primary is-fullwidth step-navigation"
                @click="++step"
              >
                Continue
              </button>
            </div>

            <div class="setting-item">
              <label class="form-switch is-primary">
                <input
                  id="busy-mode-toggle"
                  v-model="inputs.receiveOffers"
                  type="checkbox"
                  class="is-switch"
                />
                <i></i>
              </label>
              <div class="setting-meta">
                <span>Receive marketing teamEmails from Moebius.io</span>
              </div>
            </div>

            <p>
              By clicking "Continue", you accept our <a>Terms Of Service</a>, our
              <a>Privacy Policy</a> and our <a>Cookie Policy</a>.
            </p>
          </div>
        </div>
      </div>

      <!--Step 2-->
      <div :class="[step === 2 && 'is-active']" class="wizard-step">
        <div class="step-inner">
          <h2>Tell us a little more about you and your background</h2>
          <p>Those details will be sent to people invited to your workspace.</p>

          <div class="details-form">
            <div class="avatar-upload">
              <div class="avatar-edit">
                <input
                  id="imageUpload"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  @change="onAvatarChange"
                />
                <label for="imageUpload">
                  <PlusIcon />
                </label>
              </div>
              <div class="avatar-preview">
                <img
                  id="imagePreview"
                  :src="
                    !inputs.avatar ? 'https://via.placeholder.com/150x150' : inputs.avatar
                  "
                  data-demo-src="https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744076?b=1&k=6&m=1016744076&s=612x612&w=0&h=BzFVXGEM3ywHf1IebPJetP8M_2Tmhb2rDMx8SHXPrRY="
                  alt=""
                />
              </div>
            </div>

            <div class="columns is-multiline">
              <div class="column is-6">
                <div class="field">
                  <div class="control has-icon">
                    <input
                      v-model="inputs.firstName"
                      class="input"
                      placeholder="First Name"
                    />
                    <div class="form-icon">
                      <UserIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <div class="control has-icon">
                    <input
                      v-model="inputs.lastName"
                      class="input"
                      placeholder="Last Name"
                    />
                    <div class="form-icon">
                      <UserIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-12">
                <div class="field">
                  <div class="control has-icon">
                    <input
                      v-model="inputs.password"
                      class="input"
                      type="password"
                      placeholder="Password"
                    />
                    <div class="form-icon">
                      <LockIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-12">
                <div class="field">
                  <div class="control">
                    <textarea
                      v-model="inputs.biography"
                      class="textarea"
                      rows="2"
                      placeholder="Write a short bio"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="submit-wrap">
              <button
                :disabled="!isStep2Valid"
                class="button is-primary is-fullwidth step-navigation"
                @click="++step"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Step 3-->
      <div :class="[step === 3 && 'is-active']" class="wizard-step">
        <div class="step-inner">
          <h2>What's the name of your Company?</h2>
          <p>The company which is going to use that workspace.</p>

          <div class="details-form">
            <div id="company-avatar" class="company-avatar">
              <span
                class="is-capitalized has-text-primary is-size-1 has-text-weight-bold"
              >
                {{ inputs.company.substring(0, 1) }}
              </span>
            </div>
            <div class="field">
              <div class="control has-icon">
                <input
                  id="company-name-input"
                  v-model="inputs.company"
                  class="input"
                  placeholder="Company Name"
                />
                <div class="form-icon">
                  <BriefcaseIcon />
                </div>
              </div>
            </div>
            <div class="submit-wrap">
              <button
                :disabled="!isStep3Valid"
                class="button is-primary is-fullwidth step-navigation"
                @click="++step"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Step 4-->
      <div :class="[step === 4 && 'is-active']" class="wizard-step">
        <div class="step-inner">
          <h2>Would you like to invite your team to the workspace?</h2>
          <p>Invite up to 5 team members to your workspace.</p>

          <div class="details-form">
            <div class="invited-people">
              <div v-for="(email, index) in inputs.teamEmails" :key="index" class="field">
                <div class="control has-icon">
                  <input
                    v-model="inputs.teamEmails[index]"
                    class="input search-field"
                    type="text"
                    :placeholder="`Team member email n°${index + 1}`"
                    autocomplete="no"
                  />
                  <div class="form-icon">
                    <MailIcon />
                  </div>
                </div>
              </div>
            </div>

            <a v-if="inputs.teamEmails.length < 5" class="add-invite-field">
              <PlusIcon />
              <span @click="addTeamEmail()">Add another one</span>
            </a>
            <div v-else class="add-invite-field" />

            <div class="submit-wrap">
              <button
                v-if="inputs.teamEmails.length === 1 && inputs.teamEmails[0] === ''"
                class="button is-primary is-fullwidth step-navigation"
                @click="++step"
              >
                Skip
              </button>
              <button
                v-else
                :disabled="!isStep4Valid"
                class="button is-primary is-fullwidth step-navigation"
                @click="++step"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Step 5-->
      <div :class="[step === 5 && 'is-active']" class="wizard-step">
        <div class="step-inner">
          <h2>Looks like you're all set.</h2>
          <p>Congrats! You are now ready to start working and collaborating.</p>

          <div class="details-form">
            <img class="wizard-end" src="/img/illustrations/wizard.svg" alt="" />

            <div class="submit-wrap">
              <button class="button is-primary is-fullwidth" @click="createWorkspace">
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
