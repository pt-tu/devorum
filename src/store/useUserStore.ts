import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { User } from '@/types/user.type'
import { getCurrentProfileService } from '@/services/userService'

type AuthState = {
  token: string
  _id: string
}

type AuthActions = {
  setCredentials: (_id: string, token: string) => void
}

type UserState = {
  user: User | null
}

type UserActions = {
  getUserProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>()(
  immer(
    persist(
      (set) => ({
        token: '',
        _id: '',
        setCredentials: (_id, token) => {
          set((state) => {
            state.token = token
            state._id = _id
          })
        },
      }),
      {
        name: 'user-store',
      }
    )
  )
)

export const useUserStore = create<UserState & UserActions>()(
  immer((set) => ({
    user: null,
    async getUserProfile() {
      try {
        const response = await getCurrentProfileService()
        set((state) => {
          state.user = response.data
        })
      } catch (error) {
        console.log('Get current profile:', error)
      }
    },
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useAuthStore)
}
