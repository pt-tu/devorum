'use client'
import { Link } from '@nextui-org/react'
import Image from 'next/image'
import { FaBirthdayCake, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { CiLink } from 'react-icons/ci'
import { User } from '@/types/user.type'
import moment from 'moment'

type Props = {
  userProfile: User
}

const ProfileHeader = ({ userProfile }: Props) => {
  return (
    <div className="relative col-span-12 mt-12 rounded-lg bg-dark-2 p-4 text-center">
      <div className="absolute -top-1/2 left-1/2 flex aspect-square h-[136px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#333]">
        <Image
          alt="user_avatar"
          className="h-32 w-32 overflow-hidden rounded-full object-cover"
          src={userProfile.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
          width={128}
          height={128}
        />
      </div>
      <div className="h-24 text-right"></div>

      <h1 className="text-3xl font-semibold">{userProfile.fullName || userProfile.username}</h1>
      {userProfile.about && <h2 className="mt-2">{userProfile.about}</h2>}

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-3">
        <p className="flex items-center gap-2">
          <FaBirthdayCake className="mb-1" />
          <span>Joined at {moment(userProfile.createdAt).format('MMM DD, YYYY')}</span>
        </p>
        <Link href="mailto:gabe@gmail.com" className="flex items-center gap-2">
          <MdEmail className="text-xl" />
          <span>{userProfile.email}</span>
        </Link>
        <Link href="link.com" className="flex items-center gap-2">
          <CiLink className="text-xl" />
          <span>github.com</span>
        </Link>
        <Link href="link.com" className="flex items-center gap-2 text-xl">
          <FaGithub />
        </Link>
      </div>
    </div>
  )
}

export default ProfileHeader
