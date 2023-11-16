export type UserState = 'online' | 'busy' | 'offline'

export type User = {
  id: string
  nickname: string
  email: string
  phone: string
  customStatus: string
  avatar: string
  status: UserState | string
}

export type ConversationInfo = {
  id: string
  ownerId: string
  unreadMessages: number
}

export type MessageReaction = {
  id: string
  userId: string
  emoji: string
}

export type MessageAttachement = {
  mimetype: string
  name: string
  size: string
  url: string
}

export type Message = {
  id: string
  senderId: string
  content: string
  date: string
  attachement?: MessageAttachement
  reactions: MessageReaction[]
}

export type Conversation = ConversationInfo & {
  participantIds: string[]
  messages: Message[]
}
