'use client'
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoClose, IoSend } from 'react-icons/io5'
import { MdOutlinePermMedia } from 'react-icons/md'
import { FaReply } from 'react-icons/fa'
import { socket } from '@/configs/socketIO'
import useRoomsData from '@/hooks/useRoomsData'
import { Message } from '@/types/chat.type'
import { useUserStore } from '@/store/useUserStore'
import { useMessageStore } from '@/store/useMessagesStore'
import { useParams } from 'next/navigation'

type Props = {
  isReplyingTo?: {
    content: string
    username: string
  }
  setIsReplyingTo: (value: any) => void
}

const MessageBox = ({ isReplyingTo, setIsReplyingTo }: Props) => {
  const params = useParams()
  const ref = useRef<HTMLInputElement | null>(null)
  const user = useUserStore((state) => state.user)
  const appendMessage = useMessageStore((state) => state.appendMessage)
  const { data: rooms, isLoading } = useRoomsData()
  const [message, setMessage] = useState('')

  const handleClick = () => {
    ref.current?.click()
  }

  const sendMessage = () => {
    if (user && rooms && rooms.length > 0) {
      socket.emit('message', {
        room: params.roomId,
        body: message,
        from: user.username,
      })
    }
    setMessage('')
  }

  useEffect(() => {
    const handleMessageResponse = (data: Message) => {
      if (!data._id) {
        return
      }
      console.log('Received message')
      appendMessage(data)
    }

    socket.on('messageResponse', handleMessageResponse)

    return () => {
      socket.off('messageResponse', handleMessageResponse)
    }
  }, [appendMessage])

  return (
    <div className=" m-auto flex h-20 max-w-2xl flex-shrink-0 gap-6 pb-2 pt-2">
      <input type="file" ref={ref} className="hidden" accept=".jpg,.jpeg,.png" />
      <div className="relative flex-1">
        {isReplyingTo && (
          <div className="absolute -top-16 left-0 right-0 z-10 flex items-center gap-4 rounded-xl bg-default-100 px-4 py-2 text-sm">
            <FaReply className="text-xl" />

            <div className="">
              <p className="font-normal">tuan-hda</p>
              <p className="font-light">Hello world</p>
            </div>

            <Button
              onClick={() => setIsReplyingTo(undefined)}
              isIconOnly
              variant="light"
              className="ml-auto"
              radius="full"
            >
              <IoClose className="text-2xl" />
            </Button>
          </div>
        )}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          startContent={
            <Button onClick={handleClick} isIconOnly variant="light" radius="full">
              <MdOutlinePermMedia className="text-2xl" />
            </Button>
          }
          size="lg"
          className="h-full w-full rounded-xl"
        ></Input>
      </div>
      <div className="aspect-square h-full">
        <Button
          onClick={() => {
            sendMessage()
          }}
          isDisabled={message.length === 0}
          isIconOnly
          radius="full"
          size="lg"
          color="primary"
          className="h-full w-full"
        >
          <IoSend className="text-xl" />
        </Button>
      </div>
    </div>
  )
}

export default MessageBox
