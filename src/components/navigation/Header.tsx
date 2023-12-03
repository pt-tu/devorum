'use client'
import { Alarm, Chat, Communication, DropDownArrow, Home, Logo, Search } from '@/assets'
import React, { useCallback, useMemo } from 'react'
import AppInput from '../common/AppInput'
import Link from 'next/link'
import ThemeButton from '../common/ThemeButton'
import { useAuthStore, useUserStore } from '@/store/useUserStore'
import Image from 'next/image'
import { defaultAvatar } from '@/configs/defaultValues'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [user] = useUserStore((state) => [state.user])
  const logOut = useAuthStore((state) => state.logOut)
  const router = useRouter()

  const handleLogOut = useCallback(() => {
    logOut()
    router.push('/login')
  }, [logOut, router])

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
        <Button variant="flat" isIconOnly>
          <Chat />
        </Button>
        <Button variant="flat" isIconOnly>
          <Alarm />
        </Button>

        {!user ? (
          <Button as={Link} href="/register" isIconOnly>
            <Image
              width={34}
              height={34}
              src={defaultAvatar}
              className="h-full w-full rounded-lg object-cover"
              alt="user_avatar"
            />
          </Button>
        ) : (
          <Dropdown closeOnSelect>
            <DropdownTrigger>
              <Button isIconOnly>
                <Image
                  width={34}
                  height={34}
                  src={user?.avatar || defaultAvatar}
                  className="h-full w-full rounded-lg object-cover"
                  alt="user_avatar"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu closeOnSelect aria-label="Static Actions">
              <DropdownItem showDivider as={Link} href={`/p/${user.username}`} key="profile">
                {user.fullName || user.username}
                <p className="text-xs font-normal opacity-70">/{user.username}</p>
              </DropdownItem>
              <DropdownItem as={Link} href="/quicksort" key="quicksort">
                Quicksort
              </DropdownItem>
              <DropdownItem showDivider as={Link} href="/settings" key="settings">
                Settings
              </DropdownItem>
              <DropdownItem onClick={handleLogOut} key="logout">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <ThemeButton />
      </div>
    </div>
  )
}
