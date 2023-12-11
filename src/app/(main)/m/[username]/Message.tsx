import { useThemeStore } from '@/store/useThemeStore'
import { Avatar, Button } from '@nextui-org/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { IoIosHeart } from 'react-icons/io'

type Props = {
  isSelf?: boolean
  language?: string
  replyTo?: {
    content: string
    username: string
  }
  likes?: number
  // isReplyingTo?: {
  //   content: string
  //   username: string
  // }
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

const Message = ({ isSelf, language, replyTo, setIsReplyingTo, likes = 0 }: Props) => {
  const theme = useThemeStore((state) => state.theme)

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
          {replyTo && (
            <div className="mb-2 rounded-lg bg-default-300/50 p-2 text-sm">
              <p className="font-normal">tuan-hda</p>
              <p className="font-light">Hello 500 anh em</p>
            </div>
          )}
          {language ? (
            <SyntaxHighlighter
              className={classNames('font-mono font-light', theme === 'light' && 'invert')}
              language="javascript"
              style={atomDark}
              showLineNumbers
              wrapLongLines
            >
              {codeString}
            </SyntaxHighlighter>
          ) : (
            'Hello world'
          )}
          <div
            className={classNames('absolute -bottom-2 group-hover:opacity-100', likes == 0 && 'opacity-0')}
            style={{
              left: isSelf ? `-${String(likes).length * 9 + 8}px` : 'auto',
              right: !isSelf ? `-${String(likes).length * 9 + 8}px` : 'auto',
            }}
          >
            <Button size="sm" isIconOnly radius="full" className="flex w-fit gap-1 px-2 text-xs font-light">
              <IoIosHeart className="text-red-500" />
              {likes > 1 && likes}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
