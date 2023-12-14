'use client'
import { Avatar, Spinner } from '@nextui-org/react'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Message from './Message'
import MessageBox from './MessageBox'
import { MessageState, useMessageStore } from '@/store/useMessagesStore'
import { useParams } from 'next/navigation'
import { listRoomMessagesService } from '@/services/chatService'
import useRoomsData from '@/hooks/useRoomsData'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import { Message as MessageType, Room } from '@/types/chat.type'
import { socket } from '@/configs/socketIO'
import { ReallySimpleInfiniteScroll } from 'react-really-simple-infinite-scroll'
import moment from 'moment'

const MessageRoom = () => {
  const [isReplyingTo, setIsReplyingTo] = useState<{ message: MessageType }>()
  const [typingState, setTypingState] = useState<Set<string>>(new Set([]))
  const { roomId }: { roomId?: string } = useParams()
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false)
  const [rooms, loadMessages] = useMessageStore((state) => [state.rooms, state.loadMessages])
  const user = useUserStore((state) => state.user)
  const { data } = useRoomsData()
  const [dots, setDots] = useState(1)
  const [limit, setLimit] = useState(14)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        if (roomId) {
          const response = await listRoomMessagesService(roomId)
          loadMessages(roomId, response.data)
        }
      } catch (error) {
        console.log('list messages error:', error)
      }
    })()
  }, [loadMessages, roomId])

  const seenMessage = useCallback(async (roomId?: string, rooms?: MessageState['rooms'], user?: User | null) => {
    if (user && rooms && roomId) {
      const roomMessages = rooms[roomId]
      if (!roomMessages) {
        console.log('cannot find room messages')
        return
      }
      const lastMsg: MessageType | undefined = roomMessages.messages[roomMessages.messages.length - 1]
      console.log('lastmsg', lastMsg)
      if (lastMsg && !lastMsg?.seen?.includes(user.username)) {
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

  let participates = data?.find((room) => room._id === roomId) as Room
  let toUser: User
  if (participates?.participantsInfo[0].username === user?.username) {
    toUser = participates?.participantsInfo[1]
  } else {
    toUser = participates?.participantsInfo[0]
  }

  const isOtherTyping = typingState.has(toUser?.username)

  useEffect(() => {
    if (isOtherTyping) {
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev === 3) {
            return 1
          }
          return prev + 1
        })
      }, 500)
      return () => {
        clearInterval(interval)
      }
    }
  }, [isOtherTyping])

  if (!data || !roomId) {
    return null
  }

  console.log('typingState', typingState)

  const messages = rooms[roomId]?.messages || []
  const sliceMessages = messages.slice(-limit)

  const incLimit = () => {
    setIsInfiniteLoading(true)
    console.log('trigger')
    setTimeout(() => {
      setLimit((prev) => prev + 10)
      setIsInfiniteLoading(false)
    }, 1000)
  }

  const isDateDifferent = (date1: Date, date2: Date) => {
    return moment(date1).format('DD/MM/YYYY') !== moment(date2).format('DD/MM/YYYY')
  }

  return (
    <div className="relative col-span-9 flex h-[calc(100vh-80px)] flex-col justify-between bg-dark-5">
      <div className="absolute z-20 flex h-[72px] w-full flex-shrink-0 items-center gap-4 border-l border-l-dark-2 bg-dark-2/50 px-6 shadow-md backdrop-blur-md">
        <Avatar src={toUser.avatar} size="lg" />
        <div>
          <p className="text-base">{toUser.username}</p>
          <p className="font-light">
            {toUser.fullName}{' '}
            <i>{isOtherTyping && `typing something${dots === 1 ? '.' : dots === 2 ? '..' : '...'}`}</i>
          </p>
        </div>
      </div>

      <div className="small-scrollbar w-full flex-1 overflow-y-auto">
        <div className="m-auto h-full max-w-2xl space-y-4 px-1 pb-2">
          <ReallySimpleInfiniteScroll
            className={`infinite-scroll display-inverse h-full space-y-4 pt-20`}
            hasMore={limit < messages.length}
            length={messages.length}
            loadingComponent={
              isInfiniteLoading && (
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="spinner">
                    <Spinner size="lg" />
                  </div>
                  <span className="loading-label">Loading...</span>
                </div>
              )
            }
            isInfiniteLoading={isInfiniteLoading}
            onInfiniteLoad={incLimit}
            displayInverse={true}
          >
            {sliceMessages.map((message, index) => (
              <div key={message._id}>
                <Message
                  showDate={index === 0 || isDateDifferent(message.createdAt, sliceMessages[index - 1].createdAt)}
                  showAvatar={index === sliceMessages.length - 1 || sliceMessages[index + 1].from !== message.from}
                  toUser={toUser}
                  setIsReplyingTo={setIsReplyingTo}
                  message={message}
                  key={message._id}
                />
              </div>
            ))}
          </ReallySimpleInfiniteScroll>
        </div>
      </div>

      <MessageBox isReplyingTo={isReplyingTo} setIsReplyingTo={setIsReplyingTo} />
    </div>
  )
}

export default MessageRoom
