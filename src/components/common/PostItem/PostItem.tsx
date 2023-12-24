'use client'
import React, { useEffect, useState } from 'react'
import { Tags } from '../CommentItem/Tag'
import { MDEditor, Markdown } from '../Markdown'
import { Input } from '@nextui-org/react'
import { Post } from '@/types/post.type'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { usePostStore } from '@/store/usePostStore'

function PostItem(props: Post) {
  const [mounted, setMounted] = useState(false)
  const { updateSelected } = usePostStore()
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    mounted && (
      <div className="mb-6 flex flex-col rounded-2xl bg-dark-2 px-8 py-6">
        <PostHeader {...props} />

        {/* Body */}
        <div className="mt-6">
          {props.isEditing ? (
            <>
              <Input
                label="Title"
                value={props.title}
                className="mb-5"
                onChange={(e) => updateSelected({ title: e.target.value })}
              />
              <MDEditor value={props.content} onChange={(e) => updateSelected({ content: e })} />
            </>
          ) : (
            <>
              <p className="mb-[10px] text-base font-medium text-gray-bg">{props.title}</p>
              <Markdown
                source={props.content}
                className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-light text-gray-3"
              />
            </>
          )}
        </div>

        <Tags isEditing={props.isEditing} tags={props.tags || []} />

        <PostFooter {...props} />
      </div>
    )
  )
}

export default PostItem
