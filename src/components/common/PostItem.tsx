'use client'
import { ArrowUpOutlined, EyeOutlined, MessageOutlined, MoreOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Tags } from './CommentItem/Tag'
import { useRouter } from 'next/navigation'
import { usePostStore } from '@/store/usePostStore'
import { MDEditor, Markdown } from './Markdown'
import classNames from 'classnames'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
} from '@nextui-org/react'
import moment from 'moment'
import { Post, Tag } from '@/types/post.type'
import { defaultAvatar } from '@/configs/defaultValues'

function PostItem(props: Post) {
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
    if (!props.isEditing) router.push('post/1')
  }
  const onAction = (key: React.Key) => {
    switch (key) {
      case 'edit':
        setIsEditing(props._id)
        break
      case 'follow':
        console.log('Follow post')
        break
      case 'delete':
        console.log('Delete post')
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
    })
    setIsEditing(props._id)
  }

  return (
    mounted && (
      <div className="mb-6 flex flex-col gap-6 rounded-2xl bg-dark-2 px-8 py-6">
        {/* Header */}
        <div className="flex max-h-min flex-row">
          <Image className="h-9 w-9 rounded-full" alt="devorum_avt" src={props.user.avatar || defaultAvatar} />
          <div className="ml-4 h-full flex-1">
            <p className="text-sm font-normal text-gray-bg">{props.user.username}</p>
            <p className="text-[10px] font-light text-gray-400">{moment(props.updatedAt).fromNow()}</p>
          </div>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button isIconOnly variant="light" radius="full">
                <MoreOutlined className="text-2xl text-gray-3" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={onAction} variant="faded" aria-label="Static Actions">
              <DropdownItem key="edit">Edit post</DropdownItem>
              <DropdownItem key="follow">Follow this post</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* Body */}
        <div>
          {props.isEditing ? (
            <>
              <Input value={title} className="mb-5" onChange={(e) => setTitle(e.target.value)} />
              <MDEditor value={content} onChange={(e) => setContent(e || '')} />
              <div className="mt-5 flex flex-row justify-end gap-4">
                <Button size="md" radius="sm" onPress={() => setIsEditing(props._id)}>
                  Cancel
                </Button>
                <Button size="md" radius="sm" color="primary" onPress={handleSaveClick}>
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
        <div className="flex flex-row items-center gap-1">
          {props?.tags.length > 0 && <Tags tags={props.tags} />}
          <div className="flex-1" />
          <ButtonGroup size="sm">
            <Button key={'view'} variant="light" className="text-gray-3" startContent={<EyeOutlined />}>
              {props.views?.length}
            </Button>
            <Button
              key={'comment'}
              variant="light"
              className="text-gray-3"
              startContent={<MessageOutlined />}
              onPress={handlePostClick}
            >
              {props.comments?.length}
            </Button>
            <Button
              key={'vote'}
              variant="light"
              className="text-gray-3"
              startContent={<ArrowUpOutlined />}
              onPress={() => increaseVote(props._id)}
            >
              {props.votes?.length}
            </Button>
          </ButtonGroup>
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
  tags?: Tag[]
}
