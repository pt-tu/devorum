import { baseAxios } from '@/configs/axiosConfig'
import { Message, Room } from '@/types/chat.type'
import { Community } from '@/types/community.type'

const path = 'chat'

export const listRoomsService = () => baseAxios.get<Room[]>(`${path}/rooms`)
export const listRoomMessagesService = (id: string) => baseAxios.get<Message[]>(`${path}/rooms/${id}/messages`)
