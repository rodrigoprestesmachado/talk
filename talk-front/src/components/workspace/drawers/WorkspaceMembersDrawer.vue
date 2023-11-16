<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { POSITION, useToast } from 'vue-toastification'
import {
  PlusIcon,
  SearchIcon,
  XIcon,
  SlashIcon,
  SendIcon,
} from '@zhuowenli/vue-feather-icons'

type PendingMember = {
  nickname: string
  email: string
}

const WorkspaceMembersDrawer = defineComponent({
  name: 'WorkspaceMembersDrawer',
  components: {
    PlusIcon,
    SearchIcon,
    XIcon,
    SlashIcon,
    SendIcon,
  },
  emits: ['close'],
  setup() {
    // WorkspaceMembersDrawer - Composition API

    const toast = useToast()
    const isSearching = ref(false)
    const isInviting = ref(false)
    const searchTerms = ref('')
    const invitationMembers = reactive<PendingMember[]>([
      {
        nickname: '',
        email: '',
      },
    ])

    const pendingMembers = reactive<PendingMember[]>([
      {
        nickname: 'Dan Flubber',
        email: 'danflubber@gmail.com',
      },
      {
        nickname: 'Mary Clark',
        email: 'maryclark@gmail.com',
      },
    ])

    const workspaceMembers = reactive([
      {
        id: '1',
        avatar: '/uploads/avatars/helen.jpg',
        nickname: 'Helen Miller',
        customStatus: 'Sales Manager',
        status: 'busy',
      },
      {
        id: '2',
        avatar: '/uploads/avatars/ben.jpg',
        nickname: 'Ben Walsh',
        customStatus: 'Software Engineer',
        status: 'online',
      },
      {
        id: '3',
        avatar: '/uploads/avatars/walter.jpg',
        nickname: 'Walter Grey',
        customStatus: 'Solution Architect',
        status: 'offline',
      },
    ])

    const filteredPendingMembers = computed(() => {
      if (searchTerms.value === '') {
        return pendingMembers
      }

      const searchTermsRegex = new RegExp(searchTerms.value, 'i')

      return pendingMembers.filter((member) => {
        if (searchTermsRegex.test(member.nickname)) {
          return true
        }

        return false
      })
    })

    const filteredWorkspaceMembers = computed(() => {
      if (searchTerms.value === '') {
        return workspaceMembers
      }

      const searchTermsRegex = new RegExp(searchTerms.value, 'i')

      return workspaceMembers.filter((member) => {
        if (
          searchTermsRegex.test(member.nickname) ||
          searchTermsRegex.test(member.customStatus)
        ) {
          return true
        }

        return false
      })
    })

    const addInviationMember = () => {
      if (invitationMembers.length < 5) {
        invitationMembers.push({
          nickname: '',
          email: '',
        })
      }
    }

    const sendInviation = () => {
      if (invitationMembers.length === 0) {
        return
      }

      toast.success(
        invitationMembers.length === 1
          ? `${invitationMembers.length} invitation sent`
          : `${invitationMembers.length} invitations sent`,
        {
          timeout: 4000,
          position: POSITION.BOTTOM_RIGHT,
        }
      )

      isInviting.value = false

      // reset invitation informations
      invitationMembers.splice(0, invitationMembers.length)
      invitationMembers.push({
        nickname: '',
        email: '',
      })
    }

    watch(isSearching, () => {
      if (!isSearching.value) {
        searchTerms.value = ''
      }
    })

    watch(isInviting, () => {
      isSearching.value = false
    })

    return {
      isSearching,
      isInviting,
      searchTerms,
      filteredPendingMembers,
      filteredWorkspaceMembers,
      addInviationMember,
      invitationMembers,
      sendInviation,
    }
  },
})

export default WorkspaceMembersDrawer
</script>

<template>
  <div id="workspace-members-panel" class="slide-panel is-right is-small">
    <div class="slide-panel-header">
      <h3>Manage Members</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body has-slimscroll">
      <!--Active Members-->
      <div v-if="!isInviting" class="active-members">
        <div class="add-workspace-member">
          <div v-if="!isSearching" class="add-member">
            <button class="button" @click="isInviting = true">
              <PlusIcon />
            </button>
            <div class="meta">
              <span>Add Members</span>
              <span>Invite people to this workspace</span>
            </div>
            <div class="filter-button">
              <button id="filter-members" class="button" @click="isSearching = true">
                <SearchIcon />
              </button>
            </div>
          </div>

          <div v-else class="panel-search">
            <div class="field">
              <div class="control has-icon">
                <input
                  v-model="searchTerms"
                  type="text"
                  class="input custom-text-filter"
                  placeholder="Filter members..."
                />
                <div class="form-icon">
                  <SearchIcon />
                </div>
                <button class="close-filter-input" @click="isSearching = false">
                  <XIcon />
                </button>
              </div>
            </div>
          </div>

          <div class="panel-search is-hidden">
            <div class="field">
              <div class="control has-icon">
                <input
                  type="text"
                  class="input custom-text-filter"
                  placeholder="Filter members..."
                  data-filter-target=".is-member.is-confirmed-member"
                />
                <div class="form-icon">
                  <SearchIcon />
                </div>
                <button class="close-filter-input">
                  <XIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="members">
          <div v-if="filteredPendingMembers.length > 0" class="members-block">
            <div class="block-title">
              <h4>Invited ({{ filteredPendingMembers.length }})</h4>
              <div class="line"></div>
            </div>
            <div class="block-content">
              <!--Invitation-->
              <div
                v-for="member of filteredPendingMembers"
                :key="member.email"
                class="members-item is-member"
              >
                <div class="avatar-container">
                  <img
                    src="https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744076?b=1&k=6&m=1016744076&s=612x612&w=0&h=BzFVXGEM3ywHf1IebPJetP8M_2Tmhb2rDMx8SHXPrRY="
                    alt=""
                  />
                </div>
                <div class="meta">
                  <span>{{ member.nickname }}</span>
                  <span>{{ member.email }}</span>
                </div>
                <div class="actions">
                  <div class="loader-wrap">
                    <div class="loader"></div>
                  </div>
                  <button class="action is-cancel-invite">
                    <SlashIcon />
                  </button>
                </div>
              </div>
              <!--Invitation-->
            </div>
          </div>
          <div v-if="filteredWorkspaceMembers.length > 0" class="members-block">
            <div class="block-title">
              <h4>Members ({{ filteredWorkspaceMembers.length }})</h4>
              <div class="line"></div>
            </div>
            <div class="block-content">
              <!--Member-->
              <div
                v-for="user of filteredWorkspaceMembers"
                :key="user.id"
                class="members-item is-member is-confirmed-member"
              >
                <div class="avatar-container">
                  <img
                    :src="user.avatar"
                    alt=""
                    @error="$event.target.src = 'https://via.placeholder.com/150x150'"
                  />
                  <div
                    class="user-status"
                    :class="[
                      user.status === 'busy' && 'is-busy',
                      user.status === 'online' && 'is-online',
                      user.status === 'offline' && 'is-offline',
                    ]"
                  ></div>
                </div>
                <div class="meta">
                  <span>{{ user.nickname }}</span>
                  <span>{{ user.customStatus }}</span>
                </div>
                <div class="actions">
                  <div class="loader-wrap">
                    <div class="loader"></div>
                  </div>
                  <button class="action is-cancel-membership">
                    <SlashIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              filteredPendingMembers.length === 0 && filteredWorkspaceMembers.length === 0
            "
            class="members-block"
          >
            <div class="block-title">
              <h4>No member found</h4>
              <div class="line"></div>
            </div>
            <div class="custom-text-filter-placeholder has-text-centered">
              <img src="/img/illustrations/invite.svg" alt="" />
              <h3>No Matching Results</h3>
              <p>We couldn't find any matching member.</p>
              <a @click="isInviting = true">
                <PlusIcon />
                <span>Invite people</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="invite-members-form">
        <!--Instructions-->
        <div class="instructions">
          <h3>Invite Members</h3>
          <p>
            Use the form below to invite new members to this workspace. Invites will be
            pending until they are accepted.
          </p>
        </div>

        <div class="inner-form">
          <div id="invitations-list" class="form-list">
            <!--Form-->
            <div
              v-for="invitationMember of invitationMembers"
              :key="invitationMember.email"
              class="form-template"
            >
              <div class="field">
                <div class="control">
                  <input class="input" placeholder="Full Name" />
                </div>
                <div class="control">
                  <input class="input" placeholder="Email Address" />
                </div>
              </div>
            </div>
          </div>

          <a
            v-if="invitationMembers.length < 5"
            class="add-link"
            @click="addInviationMember()"
          >
            <PlusIcon />
            <span>Invite another person</span>
          </a>

          <div class="form-controls">
            <button class="button" @click="isInviting = false">
              <span>Cancel</span>
            </button>
            <button class="button is-primary" @click="sendInviation()">
              <span class="icon is-small">
                <SendIcon />
              </span>
              <span>Send Invites</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
