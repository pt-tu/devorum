import { Tag } from '@/types/post.type'
import { CloseCircleOutlined, CloseSquareOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

interface IProps {
  tag: Tag
  editing?: boolean
}

function TagButton({ tag, editing = false }: IProps) {
  return (
    <div
      className={classNames(
        'flex w-fit flex-row items-center gap-1 rounded-md bg-blue-bg px-[6px] py-1',
        editing && 'border border-blue-8 ',
      )}
    >
      <p className="whitespace-nowrap text-xs font-thin text-blue-8">{tag.name}</p>
      {editing && <CloseCircleOutlined className="text-blue-8" style={{ fontSize: 14 }} />}
    </div>
  )
}

export default TagButton
