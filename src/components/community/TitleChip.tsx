import { UserTitle } from '@/types/community.type'
import { Button } from '@nextui-org/react'
import React from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  data: UserTitle
  onDelete: () => void
} & React.HTMLAttributes<HTMLDivElement>

const TitleChip = ({ data, onDelete, ...props }: Props) => {
  return (
    <div className="group relative transition" {...props}>
      <div
        className="cursor-pointer rounded-full bg-green-500 px-8 py-4 text-black"
        style={{
          backgroundColor: data.backgroundColor,
          color: data.textColor,
        }}
      >
        {data.name}
      </div>
      <Button
        onClick={onDelete}
        isIconOnly
        size="sm"
        radius="full"
        className="absolute -right-2 -top-2 opacity-0 transition duration-300 group-hover:opacity-80"
      >
        <IoClose />
      </Button>
    </div>
  )
}

export default TitleChip
