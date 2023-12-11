'use client'
import { Avatar } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import MessageBox from './MessageBox'
import { useMessageStore } from '@/store/useMessagesStore'
import { useParams } from 'next/navigation'
import { listRoomMessagesService } from '@/services/chatService'
import useRoomsData from '@/hooks/useRoomsData'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import { Message as MessageType, Room } from '@/types/chat.type'

const MessageRoom = () => {
  const [isReplyingTo, setIsReplyingTo] = useState<{ message: MessageType }>()
  const { roomId }: { roomId?: string } = useParams()
  const [rooms, loadMessages] = useMessageStore((state) => [state.rooms, state.loadMessages])
  const ref = useRef<HTMLDivElement | null>(null)
  const user = useUserStore((state) => state.user)
  const { data } = useRoomsData()

  useEffect(() => {
    ;(async () => {
      try {
        if (roomId) {
          const response = await listRoomMessagesService(roomId)
          loadMessages(roomId, response.data)
          ref.current?.scrollIntoView()
        }
      } catch (error) {
        console.log('list messages error', error)
      }
    })()
  }, [loadMessages, roomId])

  if (!data || !roomId) {
    return null
  }

  let participates = data.find((room) => room._id === roomId) as Room
  let opponent: User
  if (participates?.participantsInfo[0].username === user?.username) {
    opponent = participates?.participantsInfo[1]
  } else {
    opponent = participates?.participantsInfo[0]
  }

  return (
    <div className="relative col-span-9 h-full bg-dark-5">
      <div className="absolute z-10 flex h-[72px] w-full items-center gap-4 border-l border-l-dark-2 bg-dark-2/50 px-6 shadow-md backdrop-blur-md">
        <Avatar size="lg" />
        <div>
          <p className="text-base">{opponent.username}</p>
          <p className="font-light">Last seen 12314</p>
        </div>
      </div>
      <div className="small-scrollbar h-[calc(100vh-168px)] w-full overflow-y-auto">
        <div className="m-auto max-w-3xl space-y-4 px-1 pb-2 pt-20">
          {roomId &&
            rooms[roomId] &&
            rooms[roomId] &&
            rooms[roomId].messages.map((message) => (
              <Message setIsReplyingTo={setIsReplyingTo} message={message} key={message._id} />
            ))}
          {/* <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message likes={2234} setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} replyTo={{ content: '', username: 'tuan-hda' }} />
          <Message setIsReplyingTo={setIsReplyingTo} /> <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} />
          <Message setIsReplyingTo={setIsReplyingTo} replyTo={{ content: '', username: 'tuan-hda' }} isSelf />
          <Message setIsReplyingTo={setIsReplyingTo} language="javascript" /> */}
          <div ref={ref} />
        </div>
      </div>
      <MessageBox isReplyingTo={isReplyingTo} setIsReplyingTo={setIsReplyingTo} />
    </div>
  )
}

export default MessageRoom
