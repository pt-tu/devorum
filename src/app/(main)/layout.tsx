'use client'
import { Header } from '@/components'
import Report from '@/components/report/Report'
import { notiSocket, socket } from '@/configs/socketIO'
import useRoomsData from '@/hooks/useRoomsData'
import { listNotificationsService } from '@/services/notificationService'
import { useMessageStore } from '@/store/useMessagesStore'
import { useNotificationStore } from '@/store/useNotificationStore'
import { useUserStore } from '@/store/useUserStore'
import { Message } from '@/types/chat.type'
import { Notification } from '@/types/notification.type'
import checkPageStatus from '@/utils/notifyUser'
import { useEffect } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user)
  const appendMessage = useMessageStore((state) => state.appendMessage)
  const loadNotifications = useNotificationStore((state) => state.loadNotifications)
  const appendNotification = useNotificationStore((state) => state.appendNotification)

  const { data: rooms, mutate } = useRoomsData()

  useEffect(() => {
    if (rooms && user) {
      socket.emit(
        'joinRooms',
        rooms.map((room) => room._id),
      )
    }
  }, [rooms, user])

  useEffect(() => {
    if (user) {
      notiSocket.emit('join', {
        room: user.username,
      })
    }
  }, [user])

  useEffect(() => {
    ;(async () => {
      if (user) {
        const response = await listNotificationsService()
        loadNotifications(response.data)
      }
    })()
  }, [loadNotifications, user])

  useEffect(() => {
    const handleReceiveNotification = (noti: Notification) => {
      appendNotification(noti)
    }

    notiSocket.on('notification', handleReceiveNotification)

    return () => {
      notiSocket.off('notification', handleReceiveNotification)
    }
  }, [appendNotification])

  useEffect(() => {
    const handleMessageResponse = (data: { message: Message; type: 'append' | 'update' }) => {
      if (!data?.message?._id) {
        return
      }

      console.log('Received message')
      if (user) checkPageStatus(data.message, user)
      appendMessage(data.message, data.type)
      mutate()
    }

    socket.on('messageResponse', handleMessageResponse)

    return () => {
      socket.off('messageResponse', handleMessageResponse)
    }
  }, [appendMessage, mutate, user])

  useEffect(() => {
    const closeChannel = () => {
      notiSocket.close()
    }
    window.addEventListener('beforeunload', closeChannel)
    return () => {
      window.removeEventListener('beforeunload', closeChannel)
    }
  }, [])

  return (
    <section>
      <Header />
      <div className="relative">
        <div className="h-20" />
        {children}
      </div>
      <div className="h-16" />
      <Report />
    </section>
  )
}

export default MainLayout
