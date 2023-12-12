'use client'

import PrivateLayout from '@/components/layouts/PrivateLayout'
import MessageChannelsBar from './MessageChannelsBar'
import { useEffect, useState } from 'react'
import useRoomsData from '@/hooks/useRoomsData'
import { useUserStore } from '@/store/useUserStore'

export default function MessageLayout({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('')
  const { data } = useRoomsData()
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    if (data && user) {
      const unreadMsgs = data.filter((room) => !room.lastMessage?.seen?.includes(user.username))
      setTitle(`${unreadMsgs.length ? '(' + unreadMsgs.length + ') ' : ' '}Message Room`)
    }
  }, [data, user])

  return (
    <PrivateLayout>
      <section className="fixed bottom-0 left-0 right-0 top-20">
        <title>{title || 'Message Room'}</title>
        <div className="m-auto grid h-[calc(100vh-80px)] grid-cols-12">
          <MessageChannelsBar />
          {children}
        </div>
      </section>
    </PrivateLayout>
  )
}
