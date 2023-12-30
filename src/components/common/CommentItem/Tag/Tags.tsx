'use client'
import React, { useState } from 'react'
import TagButton from './TagButton'
import { Tag } from '@/types/post.type'
import { Input } from '@nextui-org/react'
// import TagInput from './TagInput'

interface Props {
  tags: string[]
  isEditing?: boolean
}

function Tags({ tags, isEditing = false }: Props) {
  return (
    tags.length > 0 && (
      <div className="my-3 flex flex-row gap-2">
        {tags.map((tag) => (
          <TagButton tag={tag} key={tag} />
        ))}
      </div>
    )
  )
}

export default Tags
