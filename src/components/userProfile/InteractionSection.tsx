'use client'
import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Image from 'next/image'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useUserStore } from '@/store/useUserStore'
import { blockUserService, followUserService, unblockUserService, unfollowUserService } from '@/services/userService'
import { User } from '@/types/user.type'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'

type Props = {
  userProfile: User
  fetchUserProfile: () => Promise<void>
}

const InteractionSection = ({ userProfile, fetchUserProfile }: Props) => {
  const user = useUserStore((state) => state.user)

  const unfollow = async () => {
    try {
      await unfollowUserService(userProfile.username)
      fetchUserProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const follow = async () => {
    try {
      await followUserService(userProfile.username)
      fetchUserProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollowClick = () => {
    if (userProfile.followStatus) {
      unfollow()
    } else {
      follow()
    }
  }

  const handleBlockClick = async () => {
    try {
      await blockUserService(userProfile.username)
      fetchUserProfile()
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.msg) {
        toast.error(error.response?.data?.msg)
      }
      console.log(error)
    }
  }

  const handleUnblockClick = async () => {
    try {
      await unblockUserService(userProfile.username)
      fetchUserProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const copyLinkToProfile = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="rounded-lg bg-dark-2">
      <Image
        alt="cover"
        className="h-28 rounded-t-lg object-cover"
        src="https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg"
        width={1280}
        height={384}
      />
      {user?.username !== userProfile.username ? (
        userProfile.blockStatus?.effective ? (
          <div className="p-4">
            <Button color="danger" onClick={handleUnblockClick}>
              Blocked
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 p-4">
            <Button
              onClick={handleFollowClick}
              startContent={!userProfile.followStatus && <IoMdAddCircleOutline />}
              color={userProfile.followStatus ? 'default' : 'primary'}
              variant={userProfile.followStatus ? 'flat' : 'solid'}
            >
              {userProfile.followStatus ? 'Following' : 'Follow'}
            </Button>
            <Button startContent={<AiOutlineMessage />} variant="flat">
              Chat
            </Button>

            <Dropdown>
              <DropdownTrigger>
                <Button className="ml-auto" variant="light" isIconOnly>
                  <HiOutlineDotsHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="share" onClick={copyLinkToProfile}>
                  Share link
                </DropdownItem>
                <DropdownItem key="report">Report abuse</DropdownItem>
                <DropdownItem key="block" className="text-danger" color="danger" onClick={handleBlockClick}>
                  Block /{userProfile.username}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      ) : (
        <div className="flex gap-2 p-4">
          <Dropdown>
            <DropdownTrigger>
              <Button className="ml-auto" variant="light" isIconOnly>
                <HiOutlineDotsHorizontal />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="share" onClick={copyLinkToProfile}>
                Share link
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  )
}

export default InteractionSection
