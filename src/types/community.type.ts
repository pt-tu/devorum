export type NewCommunity = {
  name: string
  visibility: 'public' | 'private',
  scrutinizeToPost: boolean,
}