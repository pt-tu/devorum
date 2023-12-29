import IconMap from '@/configs/iconMap'
import { User } from './user.type'
import { Community } from './community.type'
export type NotificationType = keyof typeof IconMap

export type Notification = {
  _id: string
  content: string
  from: string
  fromData?: User | Community
  owner: string
  isRead: boolean
  action: string
  type: NotificationType
  createdAt: string
  updatedAt: string
  href: string
}
