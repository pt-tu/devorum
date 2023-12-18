'use client'
import { Header } from '@/components'
import { socket } from '@/configs/socketIO'
import useRoomsData from '@/hooks/useRoomsData'
import { useMessageStore } from '@/store/useMessagesStore'
import { useUserStore } from '@/store/useUserStore'
import { Message } from '@/types/chat.type'
import checkPageStatus from '@/utils/notifyUser'
import { useEffect } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user)
  const appendMessage = useMessageStore((state) => state.appendMessage)
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

  return (
    <section>
      <Header />
      <div className="relative">
        <div className="h-20" />
        {children}
      </div>
      <div className="h-16" />
    </section>
  )
}

export default MainLayout
