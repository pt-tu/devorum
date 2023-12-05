export type NewCommunity = {
  name: string
  visibility: 'public' | 'private',
  scrutinizeToPost: boolean,
}

export type Community = NewCommunity & {
  "numMembers": number
  "numPosts": number
  "rules": [],
  "createdBy": string
  "_id": string
  "createdAt": Date
  "updatedAt": Date
}