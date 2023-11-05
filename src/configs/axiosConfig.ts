import axios from 'axios'
import configs from './configs'
import { useAuthStore } from '@/store/useUserStore'

export const authAxios = axios.create({
  baseURL: configs.BACKEND_URL,
})

export const baseAxios = axios.create({
  baseURL: configs.BACKEND_URL,
  withCredentials: true,
})

baseAxios.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().token
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
