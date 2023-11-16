<script lang="ts">
import { defineComponent } from 'vue'
import { SearchIcon, XIcon, PlusIcon } from '@zhuowenli/vue-feather-icons'
import { useToast, POSITION } from 'vue-toastification'

import { getUser, getUserAvatar } from '/@src/composition/state/user/authState'
import { closeDrawer } from '/@src/composition/state/ui/workspaceDrawerState'
import { useUserSelection } from '/@src/composition/use/useUserSelection'

import UserPlaceholder from '/@src/components/users/UserPlaceholder.vue'
import SearchEmptyPlaceholder from '/@src/components/common/SearchEmptyPlaceholder.vue'

const NewConversationDrawer = defineComponent({
  name: 'NewConversationDrawer',
  components: {
    SearchEmptyPlaceholder,
    SearchIcon,
    XIcon,
    PlusIcon,
  },
  emits: ['close'],
  setup(props, { emit }) {
    // NewConversationDrawer - Composition API

    const toast = useToast()

    const { searchTerms, selectedUserIds, searchResults, toggleUserSelection, reset } =
      useUserSelection()

    const createConversation = () => {
      if (selectedUserIds.length === 0) {
        return
      }

      // call remote api to create conversation
      reset()

      toast.success('Your conversation has been created', {
        timeout: 4000,
        position: POSITION.TOP_CENTER,
      })

      closeDrawer()
    }

    return {
      closeDrawer,
      searchTerms,
      selectedUserIds,
      searchResults,
      toggleUserSelection,
      reset,
      createConversation,
      getUser,
      getUserAvatar,
    }
  },
})

export default NewConversationDrawer
</script>

<template>
  <div class="slide-panel is-left is-small">
    <div class="slide-panel-header">
      <h3>New Conversation</h3>
      <a class="slide-panel-close" @click="$emit('close')">
        <i class="material-icons">close</i>
      </a>
    </div>

    <div class="slide-panel-body">
      <!--Instructions-->
      <div class="help-text has-text-centered">
        <h3>Start a new conversation</h3>
        <p>
          Use the form below to invite new members to this workspace. Invites will be
          pending until they are accepted.
        </p>
      </div>

      <div class="control has-icon">
        <input
          v-model="searchTerms"
          class="input search-field"
          placeholder="Search users..."
        />
        <div class="form-icon">
          <SearchIcon />
        </div>
        <div
          class="search-results has-slimscroll"
          :class="[searchTerms.length > 0 && 'is-active']"
        >
          <a
            v-for="user in searchResults"
            :key="user.id"
            class="search-result"
            @click="toggleUserSelection(user.id)"
          >
            <img
              class="avatar"
              :src="user.avatar"
              alt=""
              @error="$event.target.src = 'https://via.placeholder.com/32x32'"
            />
            <div class="meta">
              <span>{{ user.nickname }}</span>
              <span>{{ user.customStatus }}</span>
            </div>
          </a>

          <div v-if="searchResults.length === 0" class="placeholder-wrap">
            <div class="placeholder-content has-text-centered">
              <SearchEmptyPlaceholder class="empty-placeholder" />

              <h3>No Matching Results</h3>
              <p>
                Sorry, we couldn't find any matching records. Please try different search
                terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="selected-users">
        <div v-if="selectedUserIds.length > 0" class="selected-users-list has-slimscroll">
          <div v-for="userId in selectedUserIds" :key="userId" class="selected-user">
            <div class="avatar-container">
              <img
                loading="lazy"
                :src="getUserAvatar(userId)"
                alt=""
                @error="$event.target.src = 'https://via.placeholder.com/32x32'"
              />
            </div>
            <span>{{ getUser(userId).nickname }}</span>
            <button
              class="remove-icon hint--top hint--rounded"
              data-hint="Remove"
              @click="toggleUserSelection(userId)"
            >
              <XIcon />
            </button>
          </div>
        </div>
      </div>

      <div class="create-conversation has-text-centered">
        <button
          id="create-conversation-button"
          :class="[selectedUserIds.length === 0 && 'is-disabled']"
          :disabled="selectedUserIds.length === 0"
          class="button is-primary"
          @click="createConversation()"
        >
          <span class="icon is-small">
            <PlusIcon />
          </span>
          <span>Create Conversation</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-placeholder {
  display: block;
  margin: 0 auto 16px;
  max-width: 90px;
  height: auto;
}
</style>
