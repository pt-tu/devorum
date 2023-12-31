export type Comment = {
  _id: string
  content: string
  createdAt: Date
  updatedAt: Date
  postId: string
  replyTo?: string
  replies?: Comment[]
  author: string
  votes: string[]
}
