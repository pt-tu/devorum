import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { listNotificationsService } from '@/services/notificationService'
import { Notification } from '@/types/notification.type'

export interface NotificationState {
  notifications: Notification[]
  loading: boolean
  appendNotification: (noti: Notification) => void
  loadNotifications: () => void
}

export const useNotificationStore = createWithEqualityFn<NotificationState>()(
  immer((set, get) => ({
    loading: true,
    notifications: [],
    appendNotification: (noti: Notification) =>
      set((state) => {
        state.notifications.unshift(noti)
      }),
    loadNotifications: async () => {
      try {
        const response = await listNotificationsService()
        set((state) => {
          state.notifications = response.data
          state.loading = false
        })
      } catch (error) {
        console.log('Fetch notifications error:', error)
        set((state) => (state.loading = false))
      }
    },
  })),
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Notification', useNotificationStore)
}
