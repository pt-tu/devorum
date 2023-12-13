'use client'
import { Button, Textarea } from '@nextui-org/react'
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
import { uploadFileService } from '@/services/uploadService'
import Image from 'next/image'
import detectLang from 'lang-detector'

type Props = {
  isReplyingTo?: {
    message: Message
  }
  setIsReplyingTo: (value: any) => void
}

let timeout: NodeJS.Timeout

const MessageBox = ({ isReplyingTo, setIsReplyingTo }: Props) => {
  const params = useParams()
  const ref = useRef<HTMLInputElement | null>(null)
  const user = useUserStore((state) => state.user)
  const appendMessage = useMessageStore((state) => state.appendMessage)
  const { data: rooms, mutate } = useRoomsData()
  const [message, setMessage] = useState('')

  const handleClick = () => {
    ref.current?.click()
  }

  const sendMessage = () => {
    if (user && rooms && rooms.length > 0) {
      const lang = detectLang(message)

      let language: string | undefined = undefined
      if (typeof lang === 'string') {
        language = lang.toLowerCase()
      }

      const data: any = {
        room: params.roomId,
        body: message,
        from: user.username,
        replyTo: isReplyingTo?.message?._id,
        seen: [user.username],
      }

      if (language && language !== 'unknown') {
        data.language = language
      }

      socket.emit('message', data)
      setIsReplyingTo(undefined)
    }
    setMessage('')
  }

  const handleTyping = () => {
    if (params.roomId && user?.username) {
      socket.emit('typing', {
        room: params.roomId,
        username: user.username,
      })
      if (timeout) clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      if (params.roomId && user?.username) {
        socket.emit('stopTyping', {
          room: params.roomId,
          username: user.username,
        })
      }
    }, 3000)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    try {
      if (file && user) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await uploadFileService(formData)
        if (response.data) {
          socket.emit('message', {
            room: params.roomId,
            from: user.username,
            mediaUrl: response.data.url,
          })
        }
      }
    } catch (error) {
      console.log('upload file message box', error)
    }
  }

  return (
    <div className=" m-auto flex w-full max-w-2xl flex-shrink-0 gap-6 pb-2 pt-2">
      <input onChange={handleFileChange} type="file" ref={ref} className="hidden" accept=".jpg,.jpeg,.png" />
      <div className="relative flex-1">
        {isReplyingTo && (
          <div className="absolute -top-16 left-0 right-0 z-[11] flex items-center gap-4 rounded-xl bg-default-100 px-4 py-2 text-sm">
            <FaReply className="text-xl" />

            {isReplyingTo.message.mediaUrl && (
              <div className="h-8 w-8">
                <Image
                  width={32}
                  height={32}
                  src={isReplyingTo.message.mediaUrl}
                  alt="reply_message_media"
                  className="h-full w-full rounded-none object-contain"
                />
              </div>
            )}

            <div className="">
              <p className="font-normal">{isReplyingTo.message.from}</p>
              {isReplyingTo.message.body && (
                <p className="font-light">
                  {isReplyingTo.message.body.length > 60
                    ? isReplyingTo.message.body.slice(0, 60) + '...'
                    : isReplyingTo.message.body}
                </p>
              )}
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
        <Textarea
          minRows={1}
          maxRows={4}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              sendMessage()
              e.preventDefault()
            }
            handleTyping()
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          startContent={
            <Button onClick={handleClick} isIconOnly variant="light" radius="full">
              <MdOutlinePermMedia className="text-2xl" />
            </Button>
          }
          classNames={{
            input: ['mt-2'],
          }}
          size="lg"
          className="h-full w-full rounded-xl"
        ></Textarea>
      </div>
      <Button
        onClick={() => {
          sendMessage()
        }}
        isDisabled={message.length === 0}
        isIconOnly
        radius="full"
        size="lg"
        color="primary"
        className="h-16 w-16"
      >
        <IoSend className="text-xl" />
      </Button>
    </div>
  )
}

export default MessageBox
