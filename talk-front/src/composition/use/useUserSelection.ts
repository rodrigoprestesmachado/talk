import { computed, reactive, ref } from 'vue'

import { User } from '/@src/models'
import { users, loggedUserId } from '/@src/composition/state/user/authState'

export const useUserSelection = () => {
  const searchTerms = ref('')
  const selectedUserIds = reactive<string[]>([])

  const uninvitedUsers = computed<User[]>(() => {
    return users.filter(
      (user) => user.id !== loggedUserId.value && selectedUserIds.indexOf(user.id) === -1
    )
  })

  const searchResults = computed<User[]>(() => {
    const search = new RegExp(searchTerms.value, 'i')
    return uninvitedUsers.value.filter(
      (user: User) => user.nickname.search(search) !== -1
    )
  })

  const toggleUserSelection = (userId: string) => {
    searchTerms.value = ''
    if (selectedUserIds.indexOf(userId) !== -1) {
      selectedUserIds.splice(selectedUserIds.indexOf(userId), 1)
    } else {
      selectedUserIds.push(userId)
    }
  }

  const reset = () => {
    searchTerms.value = ''
    selectedUserIds.splice(0, selectedUserIds.length)
  }

  return {
    searchTerms,
    selectedUserIds,
    uninvitedUsers,
    searchResults,
    toggleUserSelection,
    reset,
  }
}
