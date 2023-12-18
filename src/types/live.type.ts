export type LiveRoom = {
  owner: string
  visibility: 'public' | 'private'
  accessibleUsers: string[]
  _id: string
  createdAt: string
  updatedAt: string
}
