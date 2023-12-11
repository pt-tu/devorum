import { baseAxios } from '@/configs/axiosConfig'
import { Room } from '@/types/chat.type'
import { Community } from '@/types/community.type'

const path = 'chat'

export const listRoomsService = () => baseAxios.get<Room[]>(`${path}/rooms`)
