'use client'
import { Avatar, Button, Input } from '@nextui-org/react'
import React from 'react'
import { IoSend } from 'react-icons/io5'
import Message from './Message'

const MessageRoom = () => {
  return (
    <div className="relative col-span-9 h-full bg-dark-5">
      <div className="absolute z-10 flex h-[72px] w-full items-center gap-4 border-l border-l-dark-2 bg-dark-2/50 px-6 shadow-md backdrop-blur-md">
        <Avatar size="lg" />
        <div>
          <p className="text-base">Tèo Phê</p>
          <p className="font-light">Last seen 12314</p>
        </div>
      </div>
      <div className="small-scrollbar h-[calc(100vh-168px)] w-full overflow-y-auto">
        <div className="m-auto max-w-2xl space-y-4 px-1 pb-2 pt-20">
          <Message />
          <Message />
          <Message />
          <Message /> <Message />
          <Message />
          <Message />
          <Message /> <Message />
          <Message />
          <Message />
          <Message /> <Message />
          <Message />
          <Message />
          <Message /> <Message />
          <Message />
          <Message isSelf />
          <Message />
        </div>
      </div>
      <div className="m-auto flex h-20 max-w-2xl gap-6 pb-2 pt-2">
        <Input size="lg" className="h-full w-full rounded-xl"></Input>
        <div className="aspect-square h-full">
          <Button isIconOnly radius="full" size="lg" color="primary" className="h-full w-full">
            <IoSend className="text-xl" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MessageRoom
