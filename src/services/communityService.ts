import { baseAxios } from '@/configs/axiosConfig'
import { NewCommunity, Community } from '@/types/community.type'

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
