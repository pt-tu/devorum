'use client'
import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import { Tags } from '../CommentItem/Tag'
import { MDEditor, Markdown } from '../Markdown'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { Post } from '@/types/post.type'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { usePostStore } from '@/store/usePostStore'
import Image from 'next/image'
import {
  TbArrowBigUp,
  TbBookmark,
  TbBookmarkFilled,
  TbBookmarkPlus,
  TbCodeMinus,
  TbDots,
  TbMessageCircle,
} from 'react-icons/tb'
import Link from 'next/link'
import { useUserStore } from '@/store/useUserStore'
import { bookmarkService, deletePostService } from '@/services/postSevice'

type Props = Post & {
  mutate?: () => void
}

function PostItem(props: Props) {
  const [curr, setCurr] = useState()
  const [mounted, setMounted] = useState(false)
  const user = useUserStore((state) => state.user)
  const { updateSelected } = usePostStore()
  useEffect(() => {
    setMounted(true)
  }, [])

  const content = useMemo(() => {
    const pattern = /<img[^>]+src="([^">]+)"/g
    return props.content?.replace(pattern, '')
  }, [props.content])

  const image = useMemo(() => {
    if (!props.content) return null
    const regex = /<img[^>]+src="([^">]+)"/g
    return props.content.match(regex)?.[0]?.split('"')[1]
  }, [props.content])

  const handleBookmark = async () => {
    try {
      await bookmarkService(props._id)
      props.mutate && props.mutate()
    } catch (error) {
      console.log('bookmark error', error)
    }
  }

  const minsRead = Math.ceil(props.content.split(' ').length / 200)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleDelete = async () => {
    try {
      await deletePostService(props._id)
      onClose()
      props.mutate && props.mutate()
    } catch (error) {
      console.log('delete post error:', error)
    }
  }

  return (
    mounted && (
      <div className="mb-6 flex h-[300px] flex-col py-6">
        <PostHeader {...props} />

        {/* Body */}
        {/* <div className="mt-6">
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
          ) : ( */}
        <Link href={`/post/${props._id}`}>
          <p className="my-3 mb-[10px] text-2xl font-semibold text-gray-bg">{props.title}</p>
        </Link>

        <div className="flex min-w-0 flex-1 items-start justify-between gap-20">
          <div className="flex h-full min-w-0 flex-1 flex-col">
            <Link className="block h-full w-full" href={`/post/${props._id}`}>
              <div
                className="lines-ellipsis l w-full min-w-0 flex-1 !bg-dark-8 text-sm font-light text-gray-3"
                style={
                  {
                    '--number-of-lines': 3,
                  } as CSSProperties
                }
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </Link>
            <div className="mt-auto flex items-center gap-1">
              <Tags isEditing={props.isEditing} tags={props.tags || []} />
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2 text-sm font-light text-gray-6/80">
                <TbArrowBigUp />
                {props.votes?.length || 0} upvotes
              </div>

              <div className="ml-4 flex items-center gap-2 text-sm font-light text-gray-6/80">
                <TbMessageCircle />
                {props.comments?.length || 0} comments
              </div>

              <p className="ml-auto mr-4 mt-0.5 text-sm font-light text-gray-6/80">
                {minsRead} min{minsRead > 1 && 's'} read
              </p>
              <Tooltip content="Bookmark">
                {user && (
                  <Button onClick={handleBookmark} variant="light" radius="full" isIconOnly>
                    {props.bookmark.includes(user.username) ? (
                      <TbBookmarkFilled className="text-xl text-gray-6/80" />
                    ) : (
                      <TbBookmarkPlus className="text-xl text-gray-6/80" />
                    )}
                  </Button>
                )}
              </Tooltip>
              {user?._id !== props?.user?._id && (
                <Tooltip content="Not interested">
                  <Button variant="light" radius="full" isIconOnly>
                    <TbCodeMinus className="text-xl text-gray-6/80" />
                  </Button>
                </Tooltip>
              )}
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" radius="full" isIconOnly>
                    <TbDots className="text-xl text-gray-6/80" />
                  </Button>
                </DropdownTrigger>
                {user?._id === props?.user?._id ? (
                  <DropdownMenu>
                    <DropdownItem
                      color="danger"
                      onClick={() => {
                        onOpen()
                      }}
                    >
                      Delete post
                    </DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownItem>Mute this dev</DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </div>
          </div>

          {image && (
            <Link className="w-120 h-120 block flex-shrink-0 bg-black" href={`/post/${props._id}`}>
              <Image src={image} alt="Story" width={120} height={120} className="object-cover" />
            </Link>
          )}
        </div>
        {/* )}
        </div> */}

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
                <ModalBody>You sure you want to delete?</ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" variant="light" onPress={handleDelete}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    )
  )
}

export default PostItem
