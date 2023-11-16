/**
 * AuthState Composition API
 */

import { computed, reactive, ref } from 'vue'
import axios from 'axios'

import { User } from '/@src/models'

/* AuthState data */
const anonymousUser: User = {
  id: '',
  avatar: '',
  customStatus: '',
  email: '',
  nickname: '',
  phone: '',
  status: 'offline',
}

export const users = reactive<User[]>([])
export const loggedUserId = ref('')
export const loading = ref(true)

/* AuthState computed data */

export const isAuthenticated = computed(() => {
  return loggedUserId.value !== ''
})

export const getUser = computed(() => {
  return (userId: string) => users.find((user) => user.id === userId) ?? anonymousUser
})

export const getLoggedUser = computed(() => {
  return getUser.value(loggedUserId.value) ?? anonymousUser
})

export const getLoggedUserAvatar = computed(() => {
  return getUserAvatar.value(loggedUserId.value)
})

export const getUserAvatar = computed(() => {
  return (userId: string) => {
    const user = getUser.value(userId)

    return user?.avatar ?? ''
  }
})

export const getUsers = computed(() => {
  return (userIds: string[]) => users.filter((user) => userIds.includes(user.id))
})

/* AuthState mutations */

export function logoutUser() {
  loggedUserId.value = ''
}

export async function loginUser(email: string, password: string) {
  loading.value = true

  // call users api
  // errors are not catched here: they have to be handled in components
  // so we can display related message to user (using a toast, ...)
  const response = await axios.post(`/api/auth/login.json`, {
    email,
    password,
  })

  // this is to test registration fail
  if (password === 'shouldfail') {
    throw new Error('Login failed')
  }

  if (!response.data.success || !response.data.userId) {
    throw new Error('Login failed')
  }

  loggedUserId.value = response.data.userId
}

type RegisterUserPayload = {
  username: string
  email: string
  password: string
  avatar?: string
  biography?: string
  company?: string
  teamEmails?: string[]
  receiveOffers?: boolean
}

export async function registerUser({
  username,
  email,
  avatar,
  password,
  biography,
  company,
  teamEmails,
  receiveOffers,
}: RegisterUserPayload) {
  loading.value = true

  // call users api
  // errors are not catched here: they have to be handled in components
  // so we can display related message to user (using a toast, ...)
  const response = await axios.post(`/api/auth/register.json`, {
    username,
    email,
    password,
    avatar,
    biography,
    company,
    teamEmails,
    receiveOffers,
  })

  // this is to test registration fail
  if (password === 'shouldfail') {
    throw new Error('Registration failed')
  }

  if (!response.data.success || !response.data.userId) {
    throw new Error('Registration failed')
  }

  loggedUserId.value = response.data.userId
}

export async function loadUsers() {
  loading.value = true

  // call users api
  // errors are not catched here: they have to be handled in components
  // so we can display related message to user (using a toast, ...)
  const response = await axios.get(`/api/users.json`)
  const data: User[] = response.data

  // clean users array
  users.splice(0, users.length)

  // push received users from api
  users.push(...data)

  loading.value = false

  return users
}
