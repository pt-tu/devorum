import { Button, Input } from '@nextui-org/react'
import React, { useRef } from 'react'
import { IoClose, IoSend } from 'react-icons/io5'
import { MdOutlinePermMedia } from 'react-icons/md'
import { FaReply } from 'react-icons/fa'
import { io } from 'socket.io-client'
import { socket } from '@/configs/socketIO'

type Props = {
  isReplyingTo?: {
    content: string
    username: string
  }
  setIsReplyingTo: (value: any) => void
}

const MessageBox = ({ isReplyingTo, setIsReplyingTo }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    ref.current?.click()
  }

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
            console.log('trigger')
            socket.emit('message', { hello: 'Data' })
            socket.once('messageResponse', function (msg) {
              console.log('socket working on the frontend: ', msg)
            })
          }}
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
