'use client'
import { Post } from '@/types/post.type'
import React, { useEffect, useState } from 'react'
import { Tags } from '../CommentItem/Tag'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { ArrowUpOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { usePostStore } from '@/store/usePostStore'
import { useUserStore } from '@/store/useUserStore'
import {
  CreatePostProps,
  addViewService,
  createPostService,
  toggleVoteService,
  updatePostService,
} from '@/services/postSevice'
import { NewTagProps, createTagService } from '@/services/tagService'

const PostFooter = (props: Post) => {
  const router = useRouter()
  const { toggleVote, addView } = usePostStore()
  const { user } = useUserStore()
  const checkVote = props.votes?.includes(user?._id || '')
  const [commentLoading, setCommentLoading] = useState(false)
  const { selected } = usePostStore()

  const { setIsEditing, updatePost } = usePostStore()

  const handleSaveClick = async () => {
    const newTag = selected?.tags
      .filter((tag) => tag === '-1')
      .reduce((acc: NewTagProps[], tag) => {
        acc.push({
          name: tag,
          desc: tag,
        })
        return acc
      }, [])
    const resTag = await createTagService(newTag || [])
    const tags = selected?.tags
      .filter((tag) => tag !== '-1')
      .map((tag) => tag)
      .concat(resTag.data.map((tag) => tag._id))
    const newData = {
      ...selected,
      title: selected?.title,
      content: selected?.content,
      tags,
    } as CreatePostProps

    if (selected?._id === '-1') {
      await createPostService(newData)
      router.push('/')
    } else {
      const res = await updatePostService(newData)
      updatePost(res.data)
    }
  }
  const handleCommentClick = () => {
    const addViewAndGoToComment = async () => {
      const res = await addViewService(props._id)
      // if (res.data) addView(props._id, res.data)
      router.push(`post/${props._id}`)
    }
    setCommentLoading(true)
    if (!props.isEditing) addViewAndGoToComment()
  }

  const handleVoteClick = async () => {
    const res = await toggleVoteService(props._id)
    if (res.data) toggleVote(props._id, res.data)
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <div className="flex-1" />
      {props.isEditing ? (
        <div className="mt-5 flex flex-row justify-end gap-4">
          <Button size="md" radius="sm" onPress={() => setIsEditing(props._id)}>
            Cancel
          </Button>
          <Button size="md" radius="sm" color="primary" onPress={handleSaveClick}>
            {props._id === '-1' ? 'Post' : 'Save'}
          </Button>
        </div>
      ) : (
        <ButtonGroup size="sm">
          <Button
            key={'view'}
            variant="light"
            disableAnimation
            className="cursor-default text-gray-3"
            startContent={<EyeOutlined className="hover:cursor-default" />}
          >
            {props.views?.length}
          </Button>
          <Button
            key={'comment'}
            variant="light"
            className="text-gray-3"
            isLoading={commentLoading}
            startContent={!commentLoading && <MessageOutlined />}
            onPress={handleCommentClick}
          >
            {!commentLoading && props.comments?.length}
          </Button>
          <Button
            key={'vote'}
            variant={checkVote ? 'solid' : 'light'}
            className="text-gray-3"
            startContent={<ArrowUpOutlined />}
            onPress={handleVoteClick}
          >
            {props.votes?.length}
          </Button>
        </ButtonGroup>
      )}
    </div>
  )
}

export default PostFooter
