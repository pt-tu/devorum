import { baseAxios } from '@/configs/axiosConfig'
import { Message, Room } from '@/types/chat.type'
import { Report } from '@/types/report.type'

const path = 'report'

export const createReportService = (data: Partial<Report>) => baseAxios.post<Report>(`${path}/`, data)
export const listReportsService = () => baseAxios.get<Report[]>(`${path}/`)
export const updateReportService = (id: string, resolved: boolean) =>
  baseAxios.put(`${path}/${id}`, {
    resolved,
  })
// export const listRoomsService = () => baseAxios.get<Room[]>(`${path}/rooms`)
