import { User } from './user.type'

export type Tag = {
  _id: string
  name: string
  desc?: string
  author_id: string
  deleted: boolean
  post_ref: string[]
}

export type Post = {
  _id: string
  title: string
  content: string
  views?: string[]
  comments?: string[]
  votes?: string[]
  user: User
  tags: string[]
  isEditing?: boolean
  createdAt?: Date
  updatedAt?: Date
  community: string
  bookmark: string[]
  state: 'pending' | 'accepted' | 'rejected'
}

export type Posts = {
  totalItems: number
  posts: Post[]
  totalPages: number
  currentPage: number
}

export type PostUpdate = {
  title?: string
  content?: string
  tags?: Tag[]
}
