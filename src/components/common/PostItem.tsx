'use client'
import { ArrowUpOutlined, EyeOutlined, MessageOutlined, MoreOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Tags } from './CommentItem/Tag'
import { useRouter } from 'next/navigation'
import { TagProps } from './CommentItem/Tag/TagButton'
import { usePostStore } from '@/store/usePostStore'
import { Dropdown, MenuProps, Space, message } from 'antd'
import { MDEditor, Markdown } from './Markdown'
import classNames from 'classnames'
import { Button, Input } from '@nextui-org/react'
import moment from 'moment'

const items: MenuProps['items'] = [
  {
    key: 'edit',
    label: 'Edit',
  },
  {
    key: 'delete',
    danger: true,
    label: 'Delete',
    // icon: <SmileOutlined />,
    // disabled: true,
  },
]

function PostItem(props: PostProps) {
  const router = useRouter()
  const { increaseVote, setIsEditing, updatePost } = usePostStore()
  const [title, setTitle] = useState<string>(props.title)
  const [content, setContent] = useState<string>(props.content)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setTitle(props.title)
    setContent(props.content)
  }, [props])

  const handlePostClick = () => {
    if (!props.isEditing) router.push('topic/1')
  }
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'edit':
        setIsEditing(props.postId)
        break
      case 'delete':
        break
      default:
        break
    }
  }
  const handleSaveClick = () => {
    updatePost({
      ...props,
      title,
      content,
      time: new Date().toLocaleDateString(),
    })
    setIsEditing(props.postId)
  }

  return (
    mounted && (
      <div className="mb-6 flex flex-col gap-6 rounded-2xl bg-dark-2 px-8 py-6">
        {/* Header */}
        <div className="flex max-h-min flex-row">
          <img className="h-9 w-9 rounded-full" alt="devorum_avt" src={props.user.url} />
          <div className="ml-4 h-full flex-1">
            <p className="text-sm font-normal text-gray-bg">{props.user.name}</p>
            <p className="text-[10px] font-light text-gray-400">{'moment(props.time).fromNow()'}</p>
          </div>
          <Dropdown menu={{ items, onClick }} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreOutlined className="text-2xl text-gray-3" />
              </Space>
            </a>
          </Dropdown>
        </div>
        {/* Body */}
        <div onClick={handlePostClick} className={classNames(!props.isEditing && 'cursor-pointer')}>
          {props.isEditing ? (
            <>
              <Input value={title} className="mb-5" onChange={(e) => setTitle(e.target.value)} />
              <MDEditor value={content} onChange={(e) => setContent(e || '')} />
              <div className="mt-5 flex flex-row justify-end gap-4">
                <Button size="md" radius="sm" onClick={() => setIsEditing(props.postId)}>
                  Cancel
                </Button>
                <Button size="md" radius="sm" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
              </div>
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
        {/* Footer */}
        <div className="flex flex-row items-center gap-4">
          {props?.tags && <Tags tags={props.tags} />}
          <div className="flex-1" />
          <div className="flex flex-row items-center gap-1 text-sm text-gray-3">
            <EyeOutlined />
            <p>{props.react.views}</p>
          </div>
          <div
            className="flex cursor-pointer flex-row items-center gap-1 text-sm text-gray-3"
            onClick={handlePostClick}
          >
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
