import { Button } from '@nextui-org/react'
import React from 'react'
import { IoClose } from 'react-icons/io5'

const TitleChip = () => {
  return (
    <div className="group relative transition">
      <div className="cursor-pointer rounded-full bg-green-500 px-8 py-4 text-black">Abc</div>
      <Button
        isIconOnly
        size="sm"
        radius="full"
        className="absolute -right-2 -top-2 opacity-0 transition duration-300 group-hover:opacity-100"
      >
        <IoClose />
      </Button>
    </div>
  )
}

export default TitleChip
