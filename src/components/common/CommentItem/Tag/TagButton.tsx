import { Tag } from '@/types/post.type'
import Link from 'next/link'
import React from 'react'

interface IProps {
  tag: Tag
}

function TagButton({ tag }: IProps) {
  return (
    <Link href={'/'} className="w-fit rounded-md bg-blue-bg px-[6px] py-1">
      <p className="whitespace-nowrap text-xs font-thin text-blue-8">{tag.name}</p>
    </Link>
  )
}

export default TagButton
