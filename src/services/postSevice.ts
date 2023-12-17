import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { Posts } from '@/types/post.type'
import { QuicksortOverview, User, UserRegister } from '@/types/user.type'

const path = 'posts'

const listPostService = async (page: number, limit: number) => {
  return authAxios.get<Posts>(`${path}/posts/?page=${page}&size=${page}`)
}

export { listPostService }
