import { baseAxios } from '@/configs/axiosConfig'
import { LiveRoom } from '@/types/live.type'

const path = 'live'

export const createLiveRoomService = async () => {
  return baseAxios.post<LiveRoom>(`${path}/`)
}

export const listLiveRoomsService = async () => baseAxios.get<LiveRoom[]>(`${path}/`)
export const getLiveRoomService = async (id: string) => baseAxios.get<LiveRoom>(`${path}/${id}`)
export const updateLiveRoomService = async (id: string, data: Partial<LiveRoom>) => {
  return baseAxios.put(`${path}/${id}`, data)
}
