import { baseAxios } from '@/configs/axiosConfig'
import { Message, Room } from '@/types/chat.type'
import { Report } from '@/types/report.type'

const path = 'report'

export const createReportService = (data: Partial<Report>) => baseAxios.post<Report>(`${path}/`, data)
// export const listRoomsService = () => baseAxios.get<Room[]>(`${path}/rooms`)
export const getRoomService = (username: string) => baseAxios.get<Room>(`${path}/rooms/${username}`)
export const listRoomMessagesService = (id: string) => baseAxios.get<Message[]>(`${path}/rooms/${id}/messages`)
