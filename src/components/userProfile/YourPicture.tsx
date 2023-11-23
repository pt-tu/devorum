import { User } from '@/types/user.type'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { TbEditCircle } from 'react-icons/tb'

type Props = {
  userProfile: User
  setUserProfile: (user: User) => void
}

const YourPicture = ({ userProfile, setUserProfile }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const bannerRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (target: 'avatar' | 'banner') => (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      setUserProfile({
        ...userProfile,
        [target]: URL.createObjectURL(files[0]),
      })
    }
  }

  return (
    <div className="relative break-inside-avoid rounded-xl bg-dark-2 pb-4">
      <input className="hidden" onChange={handleFileChange('avatar')} type="file" ref={ref} />
      <input className="hidden" onChange={handleFileChange('banner')} type="file" ref={bannerRef} />
      <Image
        alt="cover"
        className="h-28 w-full rounded-t-lg object-cover"
        src={
          userProfile.banner ||
          'https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg'
        }
        width={1280}
        height={384}
      />
      <Button
        size="sm"
        className="absolute right-4 top-4 rounded-full border-black bg-dark-2"
        isIconOnly
        variant="bordered"
        onClick={() => bannerRef.current?.click()}
      >
        <TbEditCircle className="text-xl" />
      </Button>
      <div className="absolute top-16 ml-4 flex aspect-square h-[84px] items-center justify-center rounded-full bg-[#333]">
        <Image
          alt="user_avatar"
          className="h-20 w-20 overflow-hidden rounded-full object-cover"
          src={userProfile.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
          width={128}
          height={128}
        />
      </div>
      <div className="mt-8 p-4">
        <h2 className="text-lg font-medium">Your Photo</h2>
        <p className="text-sm opacity-70">This will be displayed on your profile</p>
      </div>

      <div className="ml-4 flex gap-2">
        <Button onClick={() => ref.current?.click()}>Upload New</Button>
      </div>
    </div>
  )
}

export default YourPicture
