import { User } from './user.type'

export type Report = {
  _id: string
  description: string
  image?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  resolved: boolean
  createdByData: User
}
