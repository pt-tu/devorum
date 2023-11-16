'use client'
import { Link } from '@nextui-org/react'
import Image from 'next/image'
import { FaBirthdayCake, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { CiLink } from 'react-icons/ci'

const ProfileHeader = () => {
  return (
    <div className="relative col-span-12 mt-12 rounded-lg bg-dark-2 p-4 text-center">
      <div className="absolute -top-1/2 left-1/2 flex aspect-square h-[136px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#333]">
        <Image
          alt="user_avatar"
          className="rounded-full"
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--XO7L0VDv--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/91986/496444fa-89a7-4469-b52c-5fe3d0c21592.jpg"
          width={120}
          height={120}
        />
      </div>
      <div className="h-24 text-right"></div>

      <h1 className="text-3xl font-semibold">Gabe Romualdo</h1>
      <h2 className="mt-2">Founder, engineer, and technical writer. Top DEV Author in 2019.</h2>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-3">
        <p className="flex items-center gap-2">
          <FaBirthdayCake className="mb-1" />
          <span>Joined at Aug 11, 2018</span>
        </p>
        <Link href="mailto:gabe@gmail.com" className="flex items-center gap-2">
          <MdEmail className="text-xl" />
          <span>gabe@gmail.com</span>
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
