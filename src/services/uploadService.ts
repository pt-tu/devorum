import { baseAxios } from '@/configs/axiosConfig'

const path = 'upload'

export const uploadFileService = (formData: FormData) => baseAxios.post<{ url: string }>(`${path}/`, formData)
