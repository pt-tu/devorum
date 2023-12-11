import { useThemeStore } from '@/store/useThemeStore'
import { Avatar, Button } from '@nextui-org/react'
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
          onDoubleClick={() => setIsReplyingTo({ content: 'Hello baby', username: 'tuan-hda' })}
          className={classNames(
            'group relative rounded-xl p-4 font-light',
            !isSelf ? 'bg-default-100' : 'bg-primary-300',
          )}
        >
          {message.replyTo && (
            <div className="mb-2 rounded-lg bg-default-300/50 p-2 text-sm">
              <p className="font-normal">tuan-hda</p>
              <p className="font-light">Hello 500 anh em</p>
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
            <Button size="sm" isIconOnly radius="full" className="flex w-fit gap-1 px-2 text-xs font-light">
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
