type User = {
  email: string
  username: string
  password: string
  fullName?: string
  avatar?: string
  banner?: string
  about?: string
  role: string
  points: number
}

type UserRegister = Omit<User, 'role' | 'points'>

export type { User, UserRegister }
