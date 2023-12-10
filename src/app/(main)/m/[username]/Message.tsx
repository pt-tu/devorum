import { useThemeStore } from '@/store/useThemeStore'
import { Avatar } from '@nextui-org/react'
import classNames from 'classnames'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  isSelf?: boolean
  language?: string
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

const Message = ({ isSelf, language }: Props) => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div className={classNames('flex w-full gap-4', isSelf && 'flex-row-reverse')}>
      <Avatar size="lg" />
      <div className="max-w-[80%]">
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
          <div className={classNames('rounded-xl p-4', !isSelf ? 'bg-default-100' : 'bg-primary-300')}>Hello world</div>
        )}
      </div>
    </div>
  )
}

export default Message
