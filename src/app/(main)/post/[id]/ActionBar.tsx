import copyCurrentLink from '@/utils/copyCurrentLink'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi'
import { CiBookmark } from 'react-icons/ci'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoChatbubbleOutline, IoShareOutline } from 'react-icons/io5'

const ActionBar = () => {
  const [voted, setVoted] = useState(1)

  return (
    <div>
      <Divider />
      <div className="my-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button isIconOnly variant="light">
            {voted === 1 ? (
              <BiSolidUpvote className={classNames('text-2xl text-default-700')} />
            ) : (
              <BiUpvote className={classNames('text-2xl text-default-400')} />
            )}
          </Button>
          {15}
          <Button isIconOnly variant="light">
            {voted === 2 ? (
              <BiSolidUpvote className={classNames('rotate-180 text-2xl text-default-700')} />
            ) : (
              <BiUpvote className={classNames('rotate-180 text-2xl text-default-400')} />
            )}
          </Button>
        </div>
        <Button isIconOnly variant="light">
          <IoChatbubbleOutline className="text-2xl text-default-500" />
        </Button>

        <Button isIconOnly variant="light" className="ml-auto">
          <CiBookmark className="text-2xl text-default-500" />
        </Button>
        <Button onClick={copyCurrentLink} isIconOnly variant="light">
          <IoShareOutline className="text-2xl text-default-500" />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" className="text-2xl text-default-500" isIconOnly>
              <HiOutlineDotsHorizontal />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem showDivider key="show-less">
              I don{"'"} like this
            </DropdownItem>
            <DropdownItem key="mute">Blacklist this author</DropdownItem>
            <DropdownItem key="report">Report</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Divider />
    </div>
  )
}

export default ActionBar
