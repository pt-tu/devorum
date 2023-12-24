'use client'
import React, { useState } from 'react'
import TagButton from './TagButton'
import { Tag } from '@/types/post.type'
import { Input } from '@nextui-org/react'
import TagInput from './TagInput'

interface Props {
  tags: Tag[]
  isEditing?: boolean
}

function Tags({ tags, isEditing = false }: Props) {
  const [first, setFirst] = useState('')

  return isEditing ? (
    <div>
      <Input label="Tags" variant="flat" className="my-5" value={first} onChange={(e) => setFirst(e.target.value)} />
      <TagInput />
    </div>
  ) : (
    tags.length > 0 && (
      <div className="my-3 flex flex-row gap-2">
        {tags.map((tag) => (
          <TagButton tag={tag} key={tag._id} />
        ))}
      </div>
    )
  )
}

export default Tags
