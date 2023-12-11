import { useThemeStore } from '@/store/useThemeStore'
import { Avatar, Button, Image } from '@nextui-org/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { IoIosHeart } from 'react-icons/io'
import { Message } from '@/types/chat.type'
import { useUserStore } from '@/store/useUserStore'

type Props = {
  message: Message
  setIsReplyingTo: (value: any) => void
}
const codeString = `class HelloMessage extends React.Component {
  handlePress = () => {
    alert('Hello')
  }
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <button onClick={this.handlePress}>Say Hello</button>
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  mountNode
);
`

const Message = ({ setIsReplyingTo, message }: Props) => {
  const theme = useThemeStore((state) => state.theme)
  const user = useUserStore((state) => state.user)

  const isSelf = message.from === user?.username

  return (
    <div className={classNames(' flex w-full gap-4', isSelf && 'flex-row-reverse')}>
      {!isSelf && <Avatar size="lg" />}
      <div className="max-w-[80%]">
        <div
          onDoubleClick={() => setIsReplyingTo({ message })}
          className={classNames(
            'group relative rounded-xl p-4 font-light',
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
                    {message.replyTo.body.length > 74
                      ? message.replyTo.body.slice(0, 74) + '...'
                      : message.replyTo.body}
                  </p>
                )}
              </div>
            </div>
          )}

          {message.language ? (
            <SyntaxHighlighter
              className={classNames(theme === 'light' && 'invert')}
              language="javascript"
              style={atomDark}
              showLineNumbers
              wrapLongLines
            >
              {codeString}
            </SyntaxHighlighter>
          ) : message.mediaUrl ? (
            <div className="-m-4 max-h-[65vh]">
              <Image src={message.mediaUrl} alt="message_media" className="h-full w-full" />
            </div>
          ) : (
            message.body
          )}
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
            <Button size="sm" isIconOnly radius="full" className="z-10 flex w-fit gap-1 px-2 text-xs font-light">
              <IoIosHeart className="text-red-500" />
              {message.likes.length > 1 && message.likes.length}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
