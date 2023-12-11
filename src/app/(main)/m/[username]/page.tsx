'use client'
import { Avatar } from '@nextui-org/react'
import React, { useState } from 'react'
import Message from './Message'
import MessageBox from './MessageBox'

const MessageRoom = () => {
  const [isReplyingTo, setIsReplyingTo] = useState<{ content: string; username: string }>()

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
          <Message setIsReplyingTo={setIsReplyingTo} />
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
          <Message setIsReplyingTo={setIsReplyingTo} language="javascript" />
        </div>
      </div>
      <MessageBox isReplyingTo={isReplyingTo} setIsReplyingTo={setIsReplyingTo} />
    </div>
  )
}

export default MessageRoom
