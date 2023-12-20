import { defaultAvatar } from '@/configs/defaultValues'
import { usePostStore } from '@/store/usePostStore'
import { useUserStore } from '@/store/useUserStore'
import { Post } from '@/types/post.type'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import moment from 'moment'
import React from 'react'

const PostHeader = (props: Post) => {
  const { setIsEditing } = usePostStore()
  const { user } = useUserStore()
  const disable = props.user._id !== user?._id
  const isNew = props._id === '-1'

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

  return (
    <div className="flex max-h-min flex-row items-center">
      <Image className="h-9 w-9 rounded-full" alt="devorum_avt" src={props.user.avatar || defaultAvatar} />
      <div className="ml-4 h-full flex-1">
        <p className="text-sm font-normal text-gray-bg">{props.user.username}</p>
        {!isNew && <p className="text-[10px] font-light text-gray-400">{moment(props.updatedAt).fromNow()}</p>}
      </div>
      {!isNew && (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button isIconOnly variant="light" radius="full">
              <MoreOutlined className="text-2xl text-gray-3" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={onAction} variant="faded" aria-label="Static Actions">
            <DropdownItem key="edit" isDisabled={disable}>
              Edit post
            </DropdownItem>
            <DropdownItem key="follow">Follow this post</DropdownItem>
            <DropdownItem key="delete" isDisabled={disable} className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  )
}

export default PostHeader
