import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { listNotificationsService } from '@/services/notificationService'
import { Notification } from '@/types/notification.type'

export interface NotificationState {
  notifications: Notification[]
  loading: boolean
  appendNotification: (noti: Notification) => void
  loadNotifications: (notis: Notification[]) => void
}

export const useNotificationStore = createWithEqualityFn<NotificationState>()(
  immer((set) => ({
    loading: true,
    notifications: [],
    appendNotification: (noti: Notification) =>
      set((state) => {
        state.notifications.unshift(noti)
      }),
    loadNotifications: (notis) => {
      set((state) => {
        state.notifications = notis
        state.loading = false
      })
    },
  })),
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Notification', useNotificationStore)
}
