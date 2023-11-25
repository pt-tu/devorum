import { User } from './user.type'

export type Follow = {
  _id: string
  to: User
  from: User
  createdAt: Date
  updatedAt: Date
}

export type Block = {
  _id: string
  to: User
  from: User
  effective: boolean
  expiresAfter: Date
  createdAt: Date
  updatedAt: Date
}

export type FollowInformation = {
  followers: {
    total: number
    data: Follow[]
  }
  followings: {
    total: number
    data: Follow[]
  }
}

export type BlockInformation = {
  total: number
  data: Block[]
}
