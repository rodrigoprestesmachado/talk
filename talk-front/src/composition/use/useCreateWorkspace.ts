/**
 * useCreateWorkspace Composition API
 */
import { reactive } from 'vue'

import { registerUser } from '/@src/composition/state/user/authState'

type CreateWorkspacePayload = {
  onComplete?: () => void
  onError?: (error: Error) => void
}

export const useCreateWorkspace = ({
  onComplete,
  onError,
}: CreateWorkspacePayload = {}) => {
  const inputs = reactive({
    email: '',
    receiveOffers: false,
    avatar: '',
    firstName: '',
    lastName: '',
    password: '',
    biography: '',
    company: '',
    teamEmails: [''],
  })

  const addTeamEmail = () => {
    if (inputs.teamEmails.length < 5) {
      inputs.teamEmails.push('')
    }
  }

  const onAvatarChange = (event: any) => {
    const files = event.target.files

    if (!files.length) {
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      inputs.avatar = e.target?.result as string
    }
    reader.readAsDataURL(files[0])
  }

  const createWorkspace = async () => {
    try {
      await registerUser({
        username: `${inputs.firstName} ${inputs.lastName}`,
        email: inputs.email,
        password: inputs.password,
        avatar: inputs.avatar,
        biography: inputs.biography,
        company: inputs.company,
        teamEmails: inputs.teamEmails,
        receiveOffers: inputs.receiveOffers,
      })

      // here we have to persist our workspace to our backend

      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      if (onError) {
        onError(error)
      }
    }
  }

  return {
    // data
    inputs,

    // actions
    addTeamEmail,
    onAvatarChange,
    createWorkspace,
  }
}
