import { baseAxios } from '@/configs/axiosConfig'
import { Notification } from '@/types/notification.type'

const path = 'notifications'

export const listNotificationsService = () => baseAxios.get<Notification[]>(`${path}/`)
export const updateNotificationService = (id: string, data: Partial<Notification>) =>
  baseAxios.put(`${path}/${id}`, data)
export const deleteNotificationService = (id: string) => baseAxios.delete(`${path}/${id}`)
// export const listRoomsService = () => baseAxios.get<Room[]>(`${path}/rooms`)
