import { baseAxios } from '@/configs/axiosConfig'
import { NewCommunity, Community, CreateUserTitle, UserTitle } from '@/types/community.type'

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

// Join
export const joinCommunityService = (community: string) => baseAxios.post(`${path}/${community}/members`)
export const leaveCommunityService = (community: string) => baseAxios.delete(`${path}/${community}/members`)
