import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { BiUpvote, BiSolidUpvote } from 'react-icons/bi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

type Props = {
  reply?: number
}

const Comment = ({ reply }: Props) => {
  const [voted, setVoted] = useState(1)

  return (
    <div className="pt-4">
      <div className="flex items-center gap-4">
        <Avatar src="/gray.png" />
        <div>
          <p>tuan-hda</p>
          <p className="font-light">Sep 20</p>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" className="ml-auto text-2xl text-default-500" isIconOnly>
              <HiOutlineDotsHorizontal />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="report">Report</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <p className="mt-4 font-light">
        afawefj awefklj lweakfjklawejalkwefjlakwejlkawef alkwefklawejjfawkelfj awlkejfa lkwjel
      </p>
      <div className="-mx-3 mt-2 flex items-center gap-1">
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

        <Button variant="light" size="lg" className="ml-auto">
          Reply
        </Button>
      </div>
      <div className="h-4" />

      {reply && reply > 0 ? (
        <>
          <div className="flex gap-10">
            <div className="w-1.5 bg-default-200/50" />
            <Comment reply={reply - 1} />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Comment
