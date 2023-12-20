import { useThemeStore } from '@/store/useThemeStore'
import { Avatar, Button, Chip } from '@nextui-org/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { IoIosHeart } from 'react-icons/io'
import { Message as MessageType } from '@/types/chat.type'
import { useUserStore } from '@/store/useUserStore'
import moment from 'moment'
import Image from 'next/image'
import { socket } from '@/configs/socketIO'
import { useParams } from 'next/navigation'
import useRoomsData from '@/hooks/useRoomsData'
import { User } from '@/types/user.type'

type Props = {
  message: MessageType
  setIsReplyingTo: (value: any) => void
  toUser?: User
  showAvatar?: boolean
  showDate?: boolean
}

const Message = ({ setIsReplyingTo, message, toUser, showAvatar = true, showDate = false }: Props) => {
  const theme = useThemeStore((state) => state.theme)
  const user = useUserStore((state) => state.user)
  const { roomId } = useParams()
  const { data: rooms } = useRoomsData()

  const likeMessage = () => {
    if (roomId && user) {
      socket.emit('likeMessage', {
        _id: message._id,
        username: user.username,
      })
    }
  }

  const isSelf = message.from === user?.username

  const checkIsSeen = () => {
    if (!rooms || !user) return false
    const room = rooms.find((r) => r._id === roomId)
    return (
      room?.lastMessage?._id === message._id &&
      message.seen &&
      message.seen.length >= 2 &&
      message.from === user.username
    )
  }

  const checkIsLike = () => {
    if (message) {
      return message.likes.includes(user?.username || '')
    }
  }

  const formatDate = (date: Date) => {
    const now = moment()
    const days = now.diff(date, 'days')
    if (days < 7) return moment(date).format('ddd hh:mm')
    if (days < 365) return moment(date).format('DD MMM, hh:mm')
    return moment(date).format('DD MMM YY, hh:mm')
  }

  return (
    <>
      {showDate && <p className="mb-4 w-full text-center text-sm font-light">{formatDate(message.createdAt)}</p>}
      <div className={classNames('flex w-full gap-4', isSelf && 'flex-row-reverse')}>
        {!isSelf && <>{showAvatar ? <Avatar size="lg" src={toUser?.avatar} /> : <div className="w-[54px]" />}</>}
        <div className="max-w-[80%]">
          <div
            onDoubleClick={() => setIsReplyingTo({ message })}
            className={classNames(
              'group relative min-w-[100px] rounded-xl p-4 font-light',
              !isSelf ? 'bg-default-100' : 'bg-primary-300',
            )}
          >
            {message.replyTo && (
              <div className="mb-2 rounded-xl bg-default-200/50 p-2 text-sm">
                {message.replyTo.mediaUrl && (
                  <div className="h-8 w-8">
                    <Image
                      width={32}
                      height={32}
                      src={message.replyTo.mediaUrl}
                      alt="reply_message_media"
                      className="h-full w-full rounded-none object-contain"
                    />
                  </div>
                )}

                <div className="">
                  <p className="font-normal">{message.replyTo.from}</p>
                  {message.replyTo.body && (
                    <p className="font-light">
                      {message.replyTo.body.length > 60
                        ? message.replyTo.body.slice(0, 60) + '...'
                        : message.replyTo.body}
                    </p>
                  )}
                </div>
              </div>
            )}

            {message.language && message.body ? (
              <div className="-mx-4 -my-6">
                <SyntaxHighlighter
                  className={classNames('', theme === 'light' && 'invert')}
                  language={message.language}
                  style={atomDark}
                  showLineNumbers
                  wrapLongLines
                >
                  {message.body}
                </SyntaxHighlighter>
              </div>
            ) : message.mediaUrl ? (
              <div className="-m-4">
                <Image
                  height={5000}
                  width={5000}
                  src={message.mediaUrl}
                  alt="message_media"
                  className="max-h-[100vh] w-full rounded-xl"
                />
              </div>
            ) : (
              message.body
            )}

            <Chip size="sm" className="absolute bottom-0 right-0 z-[11] scale-80 bg-default-200/30 font-light">
              {moment(message.createdAt).format('hh:mm')}
            </Chip>

            <div
              className={classNames(
                'absolute -bottom-2 group-hover:opacity-100',
                message.likes.length === 0 && 'opacity-0',
              )}
              style={{
                left: isSelf ? `-${String(message.likes.length).length * 9 + 8}px` : 'auto',
                right: !isSelf ? `-${String(message.likes.length).length * 9 + 8}px` : 'auto',
              }}
            >
              <Button
                onClick={likeMessage}
                size="sm"
                color={checkIsLike() ? 'success' : 'default'}
                isIconOnly
                radius="full"
                className="z-[11] flex w-fit gap-1 px-2 text-xs font-light opacity-70"
              >
                <IoIosHeart className="text-red-500" />
                {message.likes.length > 1 && message.likes.length}
              </Button>
            </div>
          </div>
          {checkIsSeen() && <p className="text-sm font-light italic">Seen</p>}
        </div>
      </div>
    </>
  )
}

export default Message
