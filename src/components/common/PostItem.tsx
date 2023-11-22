'use client'
import { ArrowUpOutlined, EyeOutlined, MessageOutlined, MoreOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Tags } from './CommentItem/Tag'
import { useRouter } from 'next/navigation'
import { TagProps } from './CommentItem/Tag/TagButton'
import { usePostStore } from '@/store/usePostStore'

function PostItem(props: PostProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { increaseVote } = usePostStore()

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  const handleTopicClick = () => {
    router.push('topic/1')
  }

  return (
    <div className="mb-6 flex flex-col gap-6 rounded-2xl bg-dark-2 px-8 py-6">
      {/* Header */}
      <div className="flex max-h-min flex-row">
        <img className="h-9 w-9 rounded-full" alt="devorum_avt" src={props.user.url} />
        <div className="ml-4 h-full flex-1">
          <p className="text-sm font-normal text-gray-bg">{props.user.name}</p>
          <p className="text-[10px] font-light text-gray-400">{props.time}</p>
        </div>
        <MoreOutlined className="text-2xl text-gray-3" />
      </div>
      {/* Body */}
      <div onClick={handleTopicClick} className="cursor-pointer">
        <p className="mb-[10px] text-base font-medium text-gray-bg">{props.title}</p>
        <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-light text-gray-3">
          {props.content}
        </p>
      </div>
      {/* Footer */}
      <div className="flex flex-row items-center gap-4">
        {props?.tags && <Tags tags={props.tags} />}
        <div className="flex-1" />
        <div className="flex flex-row items-center gap-1 text-sm text-gray-3">
          <EyeOutlined />
          <p>{props.react.views}</p>
        </div>
        <div className="flex cursor-pointer flex-row items-center gap-1 text-sm text-gray-3" onClick={handleTopicClick}>
          <MessageOutlined />
          <p>{props.react.comments}</p>
        </div>
        <div
          className="flex cursor-pointer flex-row items-center gap-1 text-sm text-gray-3"
          onClick={() => increaseVote(props.postId)}
        >
          <ArrowUpOutlined />
          <p>{props.react.votes}</p>
        </div>
      </div>
    </div>
  )
}

export default PostItem
export interface PostProps {
  postId: string
  isEditing: boolean
  time: string
  title: string
  content: string
  react: {
    views: number
    comments: number
    votes: number
  }
  user: {
    name: string
    url: string
  }
  tags?: TagProps[]
}
