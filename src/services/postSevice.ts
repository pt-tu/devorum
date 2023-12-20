import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { Post, Posts, Tag } from '@/types/post.type'

const path = 'posts'

const listPostService = async (page: number, size?: number) => {
  return await authAxios.get<Posts>(`${path}/?page=${page}&size=${size}`)
}

const updatePostService = async (data: Post) => {
  return await baseAxios.put<Post>(`${path}/update`, data)
}

const toggleVoteService = async (data: String) => {
  return await baseAxios.put<string[]>(`${path}/toggle-vote`, { _id: data })
}

export { listPostService, updatePostService, toggleVoteService }
