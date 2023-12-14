import { baseAxios } from '@/configs/axiosConfig'
import { SubmissionResponse } from '@/types/dev.type'

const path = 'compiler'

export const submitCode = (data: any) =>
  baseAxios.post<{ token: string }>(`${path}/submissions`, data, {
    params: {
      base64_encoded: true,
    },
  })

export const getSubmissionResponse = (token: string) =>
  baseAxios.get<SubmissionResponse>(`${path}/submissions/${token}`, {
    params: {
      fields: '*',
      base64_encoded: true,
    },
  })
