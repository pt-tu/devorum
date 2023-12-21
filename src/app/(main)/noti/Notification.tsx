import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiDotsHorizontal } from 'react-icons/bi'

type Props = {
  type: 'comment' | 'post' | 'community' | 'general'
  isRead?: boolean
}

const IconMap = {
  comment: '/messenger.svg',
  post: '/twitch.svg',
  community: '/dribbble.svg',
  general: '/snapchat.svg',
}

const Notification = ({ type, isRead }: Props) => {
  return (
    <div className="relative">
      <Button
        as={Link}
        href="#"
        variant="light"
        fullWidth
        className="relative h-fit rounded-xl px-6 py-10 transition-all"
      >
        <div className="flex w-full items-start font-light">
          <div className="flex h-full min-h-[110px] flex-shrink-0 flex-col items-center justify-between ">
            <Avatar src="https://i.imgur.com/3ZLQ1fT.jpg" className="flex-shrink-0" size="lg" />
            {!isRead && <div className="h-3 w-3 rounded-full bg-blue-600"></div>}
          </div>
          <div className={classNames('ml-8 min-w-0 flex-1 pr-6 text-left text-base', isRead && 'opacity-70')}>
            <b>Nhan Hong Thanh</b>
            <p className=" two-lines-ellipsis mt-1 whitespace-normal text-sm text-default-600">
              Mentioned you in a comment. 12 Dec 20:01
            </p>
            <p className="mt-2 whitespace-normal">
              &quot;Lorem ipsum dolor sit amet consect adipisicing elit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit.&quot;
            </p>
          </div>
        </div>

        <div className="relative ml-2 h-28 w-28 flex-shrink-0 ">
          <Image
            width={144}
            height={144}
            src={IconMap[type]}
            className="absolute -top-1 z-10 aspect-square scale-[130%] object-cover object-center"
            alt="type_icon"
          />
        </div>
      </Button>

      <Dropdown>
        <DropdownTrigger>
          <Button
            onClick={(e) => e.stopPropagation()}
            className="absolute right-4 top-4 z-[11]"
            isIconOnly
            radius="full"
            variant="light"
          >
            <BiDotsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="markUnread">Mark as unread</DropdownItem>
          <DropdownItem key="delete">Delete this</DropdownItem>
          <DropdownItem key="delete">Turn off notifications for</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Notification
