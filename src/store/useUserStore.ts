import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { User } from '@/types/user.type'
import { getCurrentProfileService } from '@/services/userService'
import { shallow } from 'zustand/shallow'

type AuthState = {
  token: string
  _id: string
}

type AuthActions = {
  setCredentials: (_id: string, token: string) => void
  logOut: () => void
}

type UserState = {
  user: User | null | undefined
}

type UserActions = {
  getUserProfile: () => Promise<void>
  clearUserProfile: () => void
}

export const useAuthStore = createWithEqualityFn<AuthState & AuthActions>()(
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
        logOut: () => {
          set((state) => {
            state.token = ''
            state._id = ''
          })
          useUserStore.getState().clearUserProfile()
          window.location.href = '/login'
        },
      }),
      {
        name: 'user-store',
      },
    ),
  ),
  shallow,
)

export const useUserStore = createWithEqualityFn<UserState & UserActions>()(
  immer((set) => ({
    user: undefined,
    async getUserProfile() {
      try {
        const response = await getCurrentProfileService()
        set((state) => {
          state.user = response.data
        })
      } catch (error) {
        set((state) => {
          state.user = null
        })
        console.log('Get current profile:', error)
      }
    },
    clearUserProfile() {
      set((state) => {
        state.user = null
      })
    },
  })),
  shallow,
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useAuthStore)
}
