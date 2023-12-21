'use client'
import { Alarm, Chat, Communication, DropDownArrow, Home, Logo, Search } from '@/assets'
import React, { useCallback, useMemo } from 'react'
import AppInput from '../common/AppInput'
import Link from 'next/link'
import ThemeButton from '../common/ThemeButton'
import { useAuthStore, useUserStore } from '@/store/useUserStore'
import Image from 'next/image'
import { defaultAvatar } from '@/configs/defaultValues'
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import useRoomsData from '@/hooks/useRoomsData'
import { IoMdCode } from 'react-icons/io'
import User from './User'

export default function Header() {
  const [user] = useUserStore((state) => [state.user])
  const logOut = useAuthStore((state) => state.logOut)
  const { data } = useRoomsData()
  const unreadMsgs = data?.filter((room) => !room.lastMessage?.seen?.includes(user?.username || '')).length
  const router = useRouter()

  return (
    <div className="fixed -right-4 left-0 top-0 z-50 flex h-20 flex-1 flex-row items-center justify-between border-b border-b-dark-1 bg-dark-2/90 px-5 backdrop-blur-md">
      {/* Left */}
      <div className="flex flex-1 flex-row items-center justify-between gap-[10px] pr-7">
        <Button isIconOnly as={Link} href="/">
          <Logo width={40} height={40} />
        </Button>

        <div className="flex w-fit flex-row items-center gap-5">
          <Button variant="light" isIconOnly onPress={() => router.push('/')}>
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="light" isIconOnly>
            <Communication className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Middle */}
      <Input
        placeholder="Type here to search..."
        endContent={<Search className="mr-2" />}
        className="flex-1"
        classNames={{ inputWrapper: ['pl-5'] }}
      />

      {/* Right */}
      <div className="flex flex-1 flex-row items-center justify-center gap-6">
        <Button radius="full" variant="flat" isIconOnly as={Link} href="/dev">
          <IoMdCode className="text-2xl" />
        </Button>

        {unreadMsgs ? (
          <Badge content={''} size="lg" color="primary">
            <Button radius="full" variant="flat" isIconOnly as={Link} href="/m">
              <Chat />
            </Button>
          </Badge>
        ) : (
          <Button radius="full" variant="flat" isIconOnly as={Link} href="/m">
            <Chat />
          </Button>
        )}
        <Badge content={''} size="lg" color="primary">
          <Button radius="full" variant="flat" isIconOnly>
            <Alarm />
          </Button>
        </Badge>
        <User />
        <ThemeButton />
      </div>
    </div>
  )
}
