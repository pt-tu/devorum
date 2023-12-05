import { baseAxios } from '@/configs/axiosConfig'
import { NewCommunity } from '@/types/community.type'

const path = 'community'

export const createCommunityService = (data: NewCommunity) => baseAxios.post<{ url: string }>(`${path}/`, data)
