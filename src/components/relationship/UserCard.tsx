import { defaultAvatar } from '@/configs/defaultValues'
import { User } from '@/types/user.type'
import { Avatar, Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Props = {
  user: User
}

const UserCard = ({ user }: Props) => {
  return (
    <Card as={Link} href={`/p/${user.username}`} isPressable>
      <CardBody className="flex flex-col items-center">
        <Avatar src={user.avatar || defaultAvatar} alt="user_avatar" />
        <p className="mt-2">{user.fullName || user.username}</p>
        <p className="mt-1 text-xs font-normal opacity-70">/{user.username}</p>
      </CardBody>
    </Card>
  )
}

export default UserCard
