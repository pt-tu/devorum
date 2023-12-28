import { useAuthStore, useUserStore } from '@/store/useUserStore'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { defaultAvatar } from '@/configs/defaultValues'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user.type'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  user?: User
}

const User = forwardRef<HTMLDivElement, Props>(({ size, user: outerUser }: Props, ref) => {
  const [innerUser] = useUserStore((state) => [state.user])
  const logOut = useAuthStore((state) => state.logOut)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const user = outerUser || innerUser

  const handleLogOut = useCallback(() => {
    logOut()
    router.push('/login')
  }, [logOut, router])

  const dropdownList = useMemo(() => {
    if (!user) return []

    const outerUserList = [
      <DropdownItem showDivider={!outerUser} as={Link} href={`/p/${user.username}`} key="profile">
        {user.fullName || user.username}
        <p className="text-xs font-normal opacity-70">/{user.username}</p>
      </DropdownItem>,
    ]

    const nonOuterUserList = [
      <DropdownItem showDivider={!outerUser} as={Link} href={`/p/${user.username}`} key="profile">
        {user.fullName || user.username}
        <p className="text-xs font-normal opacity-70">/{user.username}</p>
      </DropdownItem>,
      <DropdownItem as={Link} href="/quicksort" key="quicksort">
        Quicksort
      </DropdownItem>,
      <DropdownItem showDivider as={Link} href="/settings" key="settings">
        Settings
      </DropdownItem>,
      <DropdownItem onClick={handleLogOut} key="logout">
        Log Out
      </DropdownItem>,
    ]

    if (user.role === 'admin') {
      nonOuterUserList.unshift(
        <DropdownItem showDivider as={Link} href="/admin" key="admin">
          Admin Panel
        </DropdownItem>,
      )
    }
    return outerUser ? outerUserList : nonOuterUserList
  }, [handleLogOut, outerUser, user])

  return (
    <>
      {!user ? (
        <Button size={size} as={Link} onClick={() => setIsLoading(true)} href="/login" isLoading={isLoading} isIconOnly>
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
            <Button size={size} isIconOnly radius="full">
              <Image
                width={34}
                height={34}
                src={user?.avatar || defaultAvatar}
                className="h-full w-full rounded-full object-cover"
                alt="user_avatar"
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu closeOnSelect aria-label="Static Actions">
            {dropdownList}
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  )
})

User.displayName = 'UserCircle'

export default User
