import { User } from './user.type'

export type Room = {
  _id: string
  createdAt: Date
  updatedAt: Date
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
  seen?: string[]
  language?: string
  mediaUrl?: string
  createdAt: Date
  updatedAt: Date
}
