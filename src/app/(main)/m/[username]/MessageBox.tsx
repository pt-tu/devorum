import { Button, Input } from '@nextui-org/react'
import React, { useRef } from 'react'
import { IoSend } from 'react-icons/io5'
import { MdOutlinePermMedia } from 'react-icons/md'

const MessageBox = () => {
  const ref = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    ref.current?.click()
  }

  return (
    <div className="m-auto flex h-20 max-w-2xl gap-6 pb-2 pt-2">
      <input type="file" ref={ref} className="hidden" accept=".jpg,.jpeg,.png" />
      <Input
        startContent={
          <Button onClick={handleClick} isIconOnly variant="light" radius="full">
            <MdOutlinePermMedia className="text-2xl" />
          </Button>
        }
        size="lg"
        className="h-full w-full rounded-xl"
      ></Input>
      <div className="aspect-square h-full">
        <Button isIconOnly radius="full" size="lg" color="primary" className="h-full w-full">
          <IoSend className="text-xl" />
        </Button>
      </div>
    </div>
  )
}

export default MessageBox
