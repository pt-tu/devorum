import { baseAxios } from '@/configs/axiosConfig'
import {
  NewCommunity,
  Community,
  CreateUserTitle,
  UserTitle,
  JoinedStatus,
  UpdateJoinedStatus,
  JoinedUser,
} from '@/types/community.type'
import { User } from '@/types/user.type'

const path = 'community'

export const createCommunityService = (data: NewCommunity) => baseAxios.post<Community>(`${path}/`, data)

export const checkValidityCommunityNameService = (name: string) =>
  baseAxios.get<{ isValid: boolean }>(`${path}/validity`, {
    params: {
      name: name,
    },
  })

export const getCommunityService = (name: string) => baseAxios.get<Community>(`${path}/${name}`)
export const updateCommunityService = (name: string, data: Community) => baseAxios.put(`${path}/${name}`, data)

// title
export const createUserTitleService = (community: string, data: CreateUserTitle) =>
  baseAxios.post<UserTitle>(`${path}/${community}/user-titles`, data)
export const listUserTitlesService = (name: string) => baseAxios.get<UserTitle[]>(`${path}/${name}/user-titles`)
export const updateUserTitleService = (name: string, userTitleId: string, data: CreateUserTitle) =>
  baseAxios.put(`${path}/${name}/user-titles/${userTitleId}`, data)
export const deleteUserTitleService = (name: string, userTitleId: string) =>
  baseAxios.delete(`${path}/${name}/user-titles/${userTitleId}`)

// Members
export const getCommunityMembersService = (community: string) =>
  baseAxios.get<JoinedUser[]>(`${path}/${community}/members`)
export const joinCommunityService = (community: string) => baseAxios.post(`${path}/${community}/members`)
export const leaveCommunityService = (community: string) => baseAxios.delete(`${path}/${community}/members`)
export const updateCommunityMemberStatusService = (community: string, username: string, data: UpdateJoinedStatus) =>
  baseAxios.put(`${path}/${community}/members/${username}`, data)
export const selfUpdateCommunityStatusService = (community: string, data: Omit<UpdateJoinedStatus, 'role'>) =>
  baseAxios.put(`${path}/${community}/members/self-update`, data)

// Mods
export const addModService = (community: string, username: string) =>
  baseAxios.post(`${path}/${community}/mods`, { username })
export const deleteModService = (community: string, username: string) =>
  baseAxios.delete(`${path}/${community}/mods/${username}`)
