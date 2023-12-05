export type NewCommunity = {
  name: string
  visibility: 'public' | 'private',
  scrutinizeToPost: boolean,
}

export type Community = NewCommunity & {
  numMembers: number
  numPosts: number
  title?: string
  description?: string
  rules?: [string]
  resources?: [string]
  moderators: [string]
  createdBy: string
  banner?: string
  photo?: string
}