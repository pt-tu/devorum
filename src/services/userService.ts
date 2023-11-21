import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { User, UserRegister } from '@/types/user.type'

const path = 'users'

const registerService = async (data: UserRegister) => {
  return authAxios.post<User>(`${path}/register`, data)
}

const loginService = async (data: { email: string; password: string }) => {
  return authAxios.post<{ _id: string; token: string }>(`${path}/login`, data)
}

const getCurrentProfileService = async () => {
  return baseAxios.get<User>(`${path}/current`)
}

const getProfileService = async (username: string) => {
  return baseAxios.get<User>(`${path}/${username}`)
}
export { registerService, loginService, getCurrentProfileService, getProfileService }
