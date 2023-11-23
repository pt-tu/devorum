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
  github?: string
  x?: string
  website?: string
  createdAt: Date
  updatedAt: Date
  _id: string
}

type UserRegister = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type { User, UserRegister }
