import { User } from './user.type'

export type Room = {
  _id: string
  createdAt: string
  updatedAt: string
  participants: [string]
  lastMessage?: Message
  participantsInfo: User[]
}

export type Message = {
  _id: string
  from: string
  body?: string
  likes: string[]
  replyTo?: Message
  room: string
  createdBy: string
  language?: string
  mediaUrl?: string
}
