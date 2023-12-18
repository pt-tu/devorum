import React from 'react'
import TagButton from './TagButton'
import { Tag } from '@/types/post.type'

interface Props {
  tags: Tag[]
}

function Tags({ tags }: Props) {
  //   const { tags } = props;
  return (
    tags.length && (
      <div className="my-3 flex flex-row gap-2">
        {tags.map((tag, index) => (
          <TagButton tag={tag} key={index} />
        ))}
      </div>
    )
  )
}

export default Tags
