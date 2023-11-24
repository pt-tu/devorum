'use client'
import { Button, Link } from '@nextui-org/react'
import Image from 'next/image'
import { FaBirthdayCake, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { CiLink } from 'react-icons/ci'
import { User } from '@/types/user.type'
import moment from 'moment'
import { useUserStore } from '@/store/useUserStore'
import { defaultAvatar } from '@/configs/defaultValues'

type Props = {
  userProfile: User
}

const ProfileHeader = ({ userProfile }: Props) => {
  const user = useUserStore((state) => state.user)

  return (
    <div className="relative col-span-12 mt-12 rounded-lg bg-dark-2 p-4 text-center">
      <div className="absolute -top-1/2 left-1/2 mt-2 flex aspect-square h-[136px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#333]">
        <Image
          alt="user_avatar"
          className="h-32 w-32 overflow-hidden rounded-full object-cover"
          src={userProfile.avatar || defaultAvatar}
          width={128}
          height={128}
        />
      </div>
      <div className="h-24 text-right">
        {user?._id === userProfile._id && (
          <Button color="primary" as={Link} href="/settings/profile">
            Edit Profile
          </Button>
        )}
      </div>

      <h1 className="text-3xl font-semibold">{userProfile.fullName || userProfile.username}</h1>
      {userProfile.about && <h2 className="mt-2">{userProfile.about}</h2>}

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-3">
        <p className="flex items-center gap-2">
          <FaBirthdayCake className="mb-1" />
          <span>Cake date {moment(userProfile.createdAt).format('MMM DD, YYYY')}</span>
        </p>
        {userProfile.website && (
          <Link href={userProfile.website} className="flex items-center gap-2 text-sm">
            <CiLink className="text-xl" />
            <span>{userProfile.website}</span>
          </Link>
        )}
        {userProfile.github && (
          <Link href={userProfile.github} className="flex items-center gap-2 text-xl">
            <FaGithub />
          </Link>
        )}
        {userProfile.x && (
          <Link href={userProfile.x} className="flex items-center gap-2 text-xl">
            <FaXTwitter />
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProfileHeader
