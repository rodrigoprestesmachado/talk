<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { SearchIcon, XIcon } from '@zhuowenli/vue-feather-icons'

import { getUser, getUserAvatar } from '/@src/composition/state/user/authState'
import { useUserSelection } from '/@src/composition/use/useUserSelection'

import UserPlaceholder from '/@src/components/users/UserPlaceholder.vue'
import SearchEmptyPlaceholder from '/@src/components/common/SearchEmptyPlaceholder.vue'

const NewConversationModal = defineComponent({
  name: 'NewConversationModal',
  components: {
    UserPlaceholder,
    SearchEmptyPlaceholder,
    SearchIcon,
    XIcon,
  },
  emits: ['close'],
  setup(props, { emit }) {
    // NewConversationModal - Composition API

    const { searchTerms, selectedUserIds, searchResults, toggleUserSelection, reset } =
      useUserSelection()

    const createConversation = () => {
      if (selectedUserIds.length === 0) {
        return
      }

      // call remote api to create conversation
      reset()

      emit('close')
    }

    return {
      getUser,
      getUserAvatar,
      searchTerms,
      selectedUserIds,
      searchResults,
      toggleUserSelection,
      reset,
      createConversation,
    }
  },
})

export default NewConversationModal
</script>

<template>
  <div class="add-conversation-modal action-modal">
    <div class="inner" @click="$emit('close')"></div>

    <div class="action-modal-card new-conversation-panel">
      <h2>New Conversation</h2>
      <p class="mb-16">Select some users you want to chat with</p>

      <!-- search users form -->
      <div class="control has-icon">
        <input
          v-model="searchTerms"
          class="input search-field"
          placeholder="Search users..."
        />

        <div class="form-icon">
          <SearchIcon />
        </div>

        <!-- search users suggestion -->
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
              loading="lazy"
              @error="$event.target.src = 'https://via.placeholder.com/32x32'"
            />
            <div class="meta">
              <span>{{ user.nickname }}</span>
              <span>{{ user.customStatus }}</span>
            </div>
          </a>
          <div v-if="searchResults.length === 0" class="placeholder-wrap">
            <div class="placeholder-content has-text-centered">
              <SearchEmptyPlaceholder />

              <h3>No Matching Results</h3>
              <p>
                Sorry, we couldn't find any matching records. Please try different search
                terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- selected users -->
      <div class="selected-users">
        <div v-if="selectedUserIds.length === 0" class="selected-users-placeholder">
          <div class="placeholder-content has-text-centered">
            <UserPlaceholder class="user-placeholder" />
            <h3>Add Users</h3>
            <p>Select some users to add to your conversation.</p>
          </div>
        </div>

        <div v-else class="selected-users-list has-slimscroll">
          <div v-for="userId in selectedUserIds" :key="userId" class="selected-user">
            <div class="avatar-container">
              <img
                loading="lazy"
                :src="getUserAvatar(userId)"
                alt=""
                @error="$event.target.src = 'https://via.placeholder.com/32x32'"
              />
              <button class="remove-icon" @click="toggleUserSelection(userId)">
                <XIcon />
              </button>
            </div>
            <span>{{ getUser(userId).nickname }}</span>
          </div>
        </div>
      </div>

      <!-- conversation creation -->
      <div class="button-wrap">
        <button
          id="create-conversation-button"
          class="button is-primary"
          :class="[selectedUserIds.length === 0 && 'is-disabled']"
          :disabled="selectedUserIds.length === 0"
          @click="createConversation()"
        >
          Create Conversation
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-placeholder {
  max-width: 100%;
  height: auto;
  padding: 20px 15px;
}
</style>
