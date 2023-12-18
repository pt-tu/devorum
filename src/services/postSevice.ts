import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { Posts } from '@/types/post.type'

const path = 'posts'

const listPostService = async (page: number, size?: number) => {
  return await authAxios.get<Posts>(`${path}/?page=${page}&size=${size}`)
}

export { listPostService }
