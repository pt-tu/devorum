import { Block, Follow } from './follow.type'

type User = {
  email: string
  username: string
  fullName?: string
  avatar?: string
  banner?: string
  about?: string
  role: string
  points: number
  github?: string
  x?: string
  website?: string
  createdAt: Date
  updatedAt: Date
  work?: string
  block?: string
  education?: string
  position?: string
  _id: string
  blocks: [string]
  followStatus?: Follow
  blockStatus?: Block
}

type UserRegister = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type QuicksortOverview = { follows: number; followings: number; blocks: number }

export type { User, UserRegister }
