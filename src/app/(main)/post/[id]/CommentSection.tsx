import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Textarea,
} from '@nextui-org/react'
import React, { useState } from 'react'
import Comment from './Comment'
import { useUserStore } from '@/store/useUserStore'
import NewComment from './NewComment'
import useListCommentsData from '@/hooks/useListCommentsData'
import { useParams } from 'next/navigation'
import { Comment as CommentType } from '@/types/comment.type'

const CommentSection = () => {
  const user = useUserStore((state) => state.user)
  const { id } = useParams()
  const { data, isLoading } = useListCommentsData(id as string)
  const [replyingTo, setReplyingTo] = useState<CommentType>()

  if (!data || isLoading)
    return (
      <div className="flex min-h-[calc(100vh-160px)] w-full flex-col items-center justify-center gap-6">
        <Spinner size="lg" />
      </div>
    )

  return (
    <div>
      <div className="mb-6 flex items-center">
        <h1 className="text-2xl font-medium">Comments</h1>
        <Dropdown>
          <DropdownTrigger>
            <p className="ml-auto text-sm font-light">Sorted by Recent</p>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="sort-recent">Sort recent</DropdownItem>
            <DropdownItem key="sort-relevant">Sort relevant</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <NewComment />
      <div className="h-6" />

      <div className="mt-6 space-y-6">
        {data.map((comment, idx) => (
          <>
            <Comment replyingTo={replyingTo} setReplyingTo={setReplyingTo} key={comment._id} data={comment} />
            {idx !== data.length - 1 && <Divider />}
          </>
        ))}
      </div>
    </div>
  )
}

export default CommentSection
