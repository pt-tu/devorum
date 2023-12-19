'use client'
import { ArrowUpOutlined, EyeOutlined, MessageOutlined, MoreOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Tags } from '../CommentItem/Tag'
import { useRouter } from 'next/navigation'
import { usePostStore } from '@/store/usePostStore'
import { MDEditor, Markdown } from '../Markdown'
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
import { useUserStore } from '@/store/useUserStore'
import { updatePostService } from '@/services/postSevice'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

function PostItem(props: Post) {
  const { setIsEditing, updatePost } = usePostStore()
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

  const handleSaveClick = async () => {
    const newData = {
      ...props,
      title,
      content,
    }
    const res = await updatePostService(newData)

    updatePost(res.data)
  }

  return (
    mounted && (
      <div className="mb-6 flex flex-col gap-6 rounded-2xl bg-dark-2 px-8 py-6">
        <PostHeader {...props} />

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

        <PostFooter {...props} />
      </div>
    )
  )
}

export default PostItem
