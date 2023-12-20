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
import classNames from 'classnames'
import { useUserStore } from '@/store/useUserStore'
import { toggleVoteService } from '@/services/postSevice'

const PostFooter = (props: Post) => {
  const router = useRouter()
  const { toggleVote } = usePostStore()
  const { user } = useUserStore()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const checkVote = props.votes?.includes(user?._id || '')
  const [commentLoading, setCommentLoading] = useState(false)
  const isNew = props._id === '-1'

  const handleCommentClick = () => {
    setCommentLoading(true)
    if (!props.isEditing) router.push(`post/${props._id}`)
    else onOpen()
  }

  const handleVoteClick = async () => {
    const res = await toggleVoteService(props._id)
    if (res.data) toggleVote(props._id, res.data)
  }

  const onDiscard = () => {
    setCommentLoading(false)
    onClose()
  }
  const onSave = () => {
    router.push(`post/${props._id}`)
    onClose()
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Review changes</ModalHeader>
              <ModalBody>
                <p>You have made change. Do you want to discard or save them?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onDiscard}>
                  Discard
                </Button>
                <Button color="primary" onPress={onSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {props.tags && props.tags.length > 0 && <Tags tags={props.tags || []} />}
      <div className="flex-1" />
      {!isNew && (
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
