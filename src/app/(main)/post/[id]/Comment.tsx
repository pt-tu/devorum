import useListCommentsData from '@/hooks/useListCommentsData'
import { deleteCommentService, toggleVoteCommentService } from '@/services/commentService'
import { useUserStore } from '@/store/useUserStore'
import { Comment } from '@/types/comment.type'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import classNames from 'classnames'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { BiUpvote, BiSolidUpvote } from 'react-icons/bi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import NewComment from './NewComment'
import useListProfilesData from '@/hooks/useListProfilesData'

type Props = {
  data: Comment
  replyingTo?: Comment
  setReplyingTo: (comment?: Comment) => void
  profilesMap: any
}

const Comment = ({ data, replyingTo, profilesMap, setReplyingTo }: Props) => {
  const user = useUserStore((state) => state.user)

  const { id } = useParams()
  const { mutate } = useListCommentsData(id as string)
  const voteComment = async () => {
    try {
      await toggleVoteCommentService(data._id)
      mutate()
    } catch (error) {
      console.log('Upvote comment error:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCommentService(data._id)
      mutate()
    } catch (error) {
      console.log('delete comment error:', error)
    }
  }

  return (
    <div className="flex-1 pt-4">
      <div className="flex items-center gap-4">
        <Link href={`/p/${data.author}`}>
          <Avatar src={profilesMap[data.author]?.avatar || '/gray.png'} />
        </Link>
        <div>
          <Link href={`/p/${data.author}`}>
            <p>{data.author}</p>
          </Link>
          <p className="font-light">{moment(data.createdAt).format('MMM DD')}</p>
        </div>

        {user && user.username === data.author && (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="ml-auto text-2xl text-default-500" isIconOnly>
                <HiOutlineDotsHorizontal />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onClick={handleDelete} key="delete">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      <p className="mt-4 font-light">{data.content}</p>
      <div className="-mx-3 mt-2 flex items-center gap-1">
        {user && (
          <Button onClick={voteComment} isIconOnly variant="light">
            {data.votes.includes(user.username) ? (
              <BiSolidUpvote className={classNames('text-2xl text-default-700')} />
            ) : (
              <BiUpvote className={classNames('text-2xl text-default-400')} />
            )}
          </Button>
        )}
        {data.votes.length}

        {user && (
          <Button onClick={() => setReplyingTo(data)} variant="light" size="lg" className="ml-auto">
            Reply
          </Button>
        )}
      </div>
      {replyingTo?._id === data._id && <NewComment replyingTo={replyingTo} setReplyingTo={setReplyingTo} />}
      <div className="h-4" />

      {data.replies &&
        data.replies.map((reply) => (
          <Fragment key={reply._id}>
            <div className="flex gap-10">
              <div className="w-1.5 bg-default-200/50" />
              <Comment profilesMap={profilesMap} replyingTo={replyingTo} setReplyingTo={setReplyingTo} data={reply} />
            </div>
          </Fragment>
        ))}
    </div>
  )
}

export default Comment
