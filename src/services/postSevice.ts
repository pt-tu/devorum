import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { Post, Posts, Tag } from '@/types/post.type'

const path = 'posts'
export interface CreatePostProps {
  title: string
  content: string | undefined
  tags: string[]
}

const listPostService = async (page: number, size?: number) => {
  return await authAxios.get<Posts>(`${path}/?page=${page}&size=${size}`)
}

export const listSelfPostsService = async () => {
  return await baseAxios.get<Posts>(`${path}/self`)
}

const bookmarkService = async (id: string) => {
  return await baseAxios.put<Posts>(`${path}/${id}/bookmark`)
}

const listBookmarkService = async () => {
  return await baseAxios.get<Post[]>(`${path}/bookmark`)
}

const getPostService = async (id: string) => {
  return await authAxios.get<Post>(`${path}/${id}`)
}

const updatePostService = async (data: CreatePostProps) => {
  return await baseAxios.put<Post>(`${path}/update`, data)
}

const createPostService = async (data: Partial<Post>) => {
  return await baseAxios.post<Post>(`${path}/create`, data)
}

const toggleVoteService = async (data: String) => {
  return await baseAxios.put<string[]>(`${path}/toggle-vote`, { _id: data })
}

const addViewService = async (data: String) => {
  return await baseAxios.put<string[]>(`${path}/add-view`, { _id: data })
}

const deletePostService = async (_id: String) => {
  return await baseAxios.delete(`${path}/${_id}`)
}

export {
  listPostService,
  updatePostService,
  toggleVoteService,
  createPostService,
  addViewService,
  deletePostService,
  getPostService,
  bookmarkService,
  listBookmarkService,
}
