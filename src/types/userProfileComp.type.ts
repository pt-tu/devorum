import { ChangeEvent } from 'react'
import { User } from './user.type'

export type UserProfileCompProps = {
  userProfile: User
  handleChange: (target: keyof User) => (e: ChangeEvent<HTMLInputElement>) => void
}
