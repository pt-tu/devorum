import { User } from './user.type'

export type NewCommunity = {
  name: string
  visibility: 'public' | 'private'
  scrutinizeToPost: boolean
}

export type Community = NewCommunity & {
  numMembers: number
  numPosts: number
  title?: string
  description?: string
  rules?: [string]
  resources?: [string]
  moderators: [User]
  createdBy: string
  banner?: string
  photo?: string
  allowAligningTitle: boolean
  joinedStatus?: JoinedStatus
}

export type CreateUserTitle = {
  name: string
  description?: string
  backgroundColor: string
  textColor: string
}

export type UserTitle = CreateUserTitle & {
  _id: string
}

export type JoinedStatus = {
  _id: string
  userId: string
  communityId: string
  role: string
  mute: boolean
  title?: string
  createdAt: string
  updatedAt: string
}
