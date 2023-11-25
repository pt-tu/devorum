import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { BlockInformation, Follow, FollowInformation } from '@/types/follow.type'
import { QuicksortOverview, User, UserRegister } from '@/types/user.type'

const path = 'users'

const registerService = async (data: UserRegister) => {
  return authAxios.post<User>(`${path}/register`, data)
}

const loginService = async (data: { email: string; password: string }) => {
  return authAxios.post<{ _id: string; token: string }>(`${path}/login`, data)
}

const getCurrentProfileService = async () => {
  return baseAxios.get<User>(`${path}/current`)
}

const getProfileService = async (username: string) => {
  return baseAxios.get<User>(`${path}/${username}`)
}

const updateProfileService = async (user: User) => {
  return baseAxios.put(`${path}/current`, user)
}

const getCurrentFollowInformationService = () => {
  return baseAxios.get<FollowInformation>(`${path}/relationship/follow`)
}

const getBlockListService = () => {
  return baseAxios.get<BlockInformation>(`${path}/relationship/block`)
}

const followUserService = async (id: string) => {
  return baseAxios.post(`${path}/relationship/follow`, {
    to: id,
  })
}

const unfollowUserService = async (id: string) => {
  return baseAxios.delete(`${path}/relationship/follow/${id}`)
}

const blockUserService = async (id: string) => {
  return baseAxios.post(`${path}/relationship/block`, {
    to: id,
  })
}

const unblockUserService = async (id: string) => {
  return baseAxios.delete(`${path}/relationship/block/${id}`)
}

const getOverviewQuicksortService = async () => {
  return baseAxios.get<QuicksortOverview>(`${path}/quicksort`)
}

export {
  registerService,
  loginService,
  getCurrentProfileService,
  getProfileService,
  updateProfileService,
  getCurrentFollowInformationService,
  getBlockListService,
  followUserService,
  unfollowUserService,
  blockUserService,
  unblockUserService,
  getOverviewQuicksortService,
}
