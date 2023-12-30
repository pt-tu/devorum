import usePostDetailData from '@/hooks/usePostDetailData'
import { bookmarkService, toggleVoteService, updatePostService } from '@/services/postSevice'
import { useUserStore } from '@/store/useUserStore'
import copyCurrentLink from '@/utils/copyCurrentLink'
import { Badge, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import classNames from 'classnames'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi'
import { CiBookmark } from 'react-icons/ci'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoChatbubbleOutline, IoShareOutline } from 'react-icons/io5'
import { TbArrowBigUp, TbArrowBigUpFilled, TbBookmark, TbBookmarkFilled, TbBookmarkPlus } from 'react-icons/tb'

const ActionBar = () => {
  const { id } = useParams()
  const { data, mutate } = usePostDetailData(id as string)
  const user = useUserStore((state) => state.user)

  if (!data) {
    return null
  }

  const handleVote = async () => {
    try {
      await toggleVoteService(id as string)
      mutate()
    } catch (error) {
      console.log('vote  error', error)
    }
  }

  const handleBookmark = async () => {
    try {
      await bookmarkService(id as string)
      mutate()
    } catch (error) {
      console.log('bookmark error', error)
    }
  }

  return (
    <div>
      <Divider />
      <div className="my-2 flex items-center gap-2">
        <div className="mr-2 flex items-center gap-1">
          <Button onClick={handleVote} isIconOnly variant="light">
            {data.votes?.includes(user?._id || '') ? (
              <TbArrowBigUpFilled className={classNames('text-2xl text-default-700')} />
            ) : (
              <TbArrowBigUp className={classNames('text-2xl text-default-400')} />
            )}
          </Button>
          {data.votes?.length || 0}
        </div>
        <Badge
          className={classNames(data.comments?.length === 0 && 'hidden')}
          content={data.comments?.length}
          variant="faded"
          size="sm"
        >
          <Button isIconOnly variant="light">
            <IoChatbubbleOutline className="text-2xl text-default-500" />
          </Button>
        </Badge>

        {user && (
          <Button onClick={handleBookmark} isIconOnly variant="light" className="ml-auto">
            {!data.bookmark.includes(user.username) ? (
              <TbBookmarkPlus className="text-2xl text-default-500" />
            ) : (
              <TbBookmarkFilled className="text-2xl text-default-500" />
            )}
          </Button>
        )}
        <Button onClick={copyCurrentLink} isIconOnly variant="light">
          <IoShareOutline className="text-2xl text-default-500" />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" className="text-2xl text-default-500" isIconOnly>
              <HiOutlineDotsHorizontal />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem showDivider key="show-less">
              I don{"'"} like this
            </DropdownItem>
            <DropdownItem key="mute">Blacklist this author</DropdownItem>
            <DropdownItem key="report">Report</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Divider />
    </div>
  )
}

export default ActionBar
