'use client'
import { Avatar } from '@nextui-org/react'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Message from './Message'
import MessageBox from './MessageBox'
import { MessageState, useMessageStore } from '@/store/useMessagesStore'
import { useParams, useRouter } from 'next/navigation'
import { listRoomMessagesService } from '@/services/chatService'
import useRoomsData from '@/hooks/useRoomsData'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import { Message as MessageType, Room } from '@/types/chat.type'
import { socket } from '@/configs/socketIO'

const MessageRoom = () => {
  const [isReplyingTo, setIsReplyingTo] = useState<{ message: MessageType }>()
  const [typingState, setTypingState] = useState<Set<string>>(new Set([]))
  const { roomId }: { roomId?: string } = useParams()
  const [rooms, loadMessages] = useMessageStore((state) => [state.rooms, state.loadMessages])
  const ref = useRef<HTMLDivElement | null>(null)
  const user = useUserStore((state) => state.user)
  const { data } = useRoomsData()

  useLayoutEffect(() => {
    ;(async () => {
      try {
        if (roomId) {
          const response = await listRoomMessagesService(roomId)
          loadMessages(roomId, response.data)
        }
      } catch (error) {
        console.log('list messages error', error)
      }
    })()
  }, [loadMessages, roomId])

  useEffect(() => {
    if (roomId && rooms[roomId]) {
      ref.current?.scrollIntoView()
    }
  }, [roomId, rooms])

  const seenMessage = useCallback(async (roomId?: string, rooms?: MessageState['rooms'], user?: User | null) => {
    if (user && rooms && roomId) {
      const roomMessages = rooms[roomId]
      if (!roomMessages) {
        console.log('cannot find room messages')
        return
      }
      const lastMsg = roomMessages.messages[roomMessages.messages.length - 1]
      console.log('lastmsg', lastMsg)
      if (!lastMsg.seen?.includes(user.username)) {
        console.log('send seen message event')
        socket.emit('seenMessage', { _id: lastMsg._id, username: user.username })
      }
    }
  }, [])

  useEffect(() => {
    const sendMessageFn = () => {
      seenMessage(roomId, rooms, user)
    }

    window.addEventListener('focus', sendMessageFn)
    window.addEventListener('blur', sendMessageFn)
    return () => {
      window.removeEventListener('focus', sendMessageFn)
      window.removeEventListener('blur', sendMessageFn)
    }
  }, [roomId, rooms, seenMessage, user])

  useEffect(() => {
    seenMessage(roomId, rooms, user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  useEffect(() => {
    const handleSetTyping = (payload: { isTyping: boolean; username: string }) => {
      console.log('Received typing state', payload)
      if (payload.isTyping) {
        setTypingState((prev) => {
          prev.add(payload.username)
          console.log('after add prev typing state', prev)
          return new Set(prev)
        })
      } else {
        setTypingState((prev) => {
          prev.delete(payload.username)
          return new Set(prev)
        })
      }
    }

    socket.on('typingResponse', handleSetTyping)

    return () => {
      socket.off('typingResponse', handleSetTyping)
    }
  }, [])

  if (!data || !roomId) {
    return null
  }

  let participates = data.find((room) => room._id === roomId) as Room
  let toUser: User
  if (participates?.participantsInfo[0].username === user?.username) {
    toUser = participates?.participantsInfo[1]
  } else {
    toUser = participates?.participantsInfo[0]
  }

  console.log('typingState', typingState)
  const isOtherTyping = typingState.has(toUser.username)

  return (
    <div className="relative col-span-9 h-full bg-dark-5">
      <div className="absolute z-20 flex h-[72px] w-full items-center gap-4 border-l border-l-dark-2 bg-dark-2/50 px-6 shadow-md backdrop-blur-md">
        <Avatar src={toUser.avatar} size="lg" />
        <div>
          <p className="text-base">{toUser.username}</p>
          <p className="font-light">{toUser.fullName}</p>
        </div>
      </div>
      <div className="small-scrollbar h-[calc(100vh-168px)] w-full overflow-y-auto">
        <div className="m-auto max-w-2xl space-y-4 px-1 pb-2 pt-20">
          {roomId &&
            rooms[roomId] &&
            rooms[roomId].messages.map((message) => (
              <Message toUser={toUser} setIsReplyingTo={setIsReplyingTo} message={message} key={message._id} />
            ))}

          {isOtherTyping && (
            <div className="flex items-center gap-4">
              <Avatar size="lg" src={toUser?.avatar} />
              <p>Typing...</p>
            </div>
          )}
          <div ref={ref} />
        </div>
      </div>

      <MessageBox isReplyingTo={isReplyingTo} setIsReplyingTo={setIsReplyingTo} />
    </div>
  )
}

export default MessageRoom
