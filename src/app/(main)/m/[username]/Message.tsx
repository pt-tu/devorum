import { Avatar } from '@nextui-org/react'
import classNames from 'classnames'
import React from 'react'

type Props = {
  isSelf?: boolean
}

const Message = ({ isSelf }: Props) => {
  return (
    <div className={classNames('flex w-full gap-4', isSelf && 'flex-row-reverse')}>
      <Avatar size="lg" />
      <div className={classNames('rounded-xl p-4', !isSelf ? 'bg-default-100' : 'bg-primary-300')}>Hello world</div>
    </div>
  )
}

export default Message
