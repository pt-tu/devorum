import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
import React from 'react'
import { BiDotsHorizontal } from 'react-icons/bi'

const Notification = () => {
  return (
    <div className="-mx-4">
      <Button variant="light" fullWidth className="relative h-fit rounded-xl px-4 py-2 transition-all">
        <div className="flex w-full max-w-[524px] items-center gap-4 font-light">
          <Avatar src="https://i.imgur.com/3ZLQ1fT.jpg" className="flex-shrink-0" size="lg" />
          <p className=" two-lines-ellipsis min-w-0 flex-1 whitespace-normal pr-6 text-left text-base">
            <b>Nhan Hong Thanh</b> mentioned mentio n mentioned mention men mentioned mention me n mentioned mention
            mentioned mention mentioned mention
          </p>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button className="absolute right-4 top-1/2 -translate-y-1/2" isIconOnly radius="full" variant="light">
              <BiDotsHorizontal />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="markUnread">Mark as unread</DropdownItem>
            <DropdownItem key="delete">Delete this</DropdownItem>
            <DropdownItem key="delete">Turn off notifications for</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Button>
    </div>
  )
}

export default Notification
