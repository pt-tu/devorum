import { baseAxios } from '@/configs/axiosConfig'
import { LiveRoom } from '@/types/live.type'

const path = 'live'

export const createLiveRoomService = async () => {
  return baseAxios.post<LiveRoom>(`${path}/`)
}

export const listLiveRoomsService = async () => baseAxios.get<LiveRoom[]>(`${path}/`)
