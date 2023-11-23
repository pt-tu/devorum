'use client'
import { useUserStore } from '@/store/useUserStore'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react'
import Image from 'next/image'
import { TbEditCircle } from 'react-icons/tb'

const EditProfile = () => {
  const userProfile = useUserStore((state) => state.user)

  if (!userProfile)
    return (
      <div className="col-span-9 flex items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <div className="col-span-9 space-x-4">
      <div className="relative float-left w-[calc(50%-8px)] rounded-xl bg-dark-2">
        <Image
          alt="cover"
          className="h-28 w-full rounded-t-lg object-cover"
          src="https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg"
          width={1280}
          height={384}
        />
        <Button
          size="sm"
          className="absolute right-4 top-4 rounded-full border-black bg-dark-2"
          isIconOnly
          variant="bordered"
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

        <div className="mb-4 ml-4 flex gap-2">
          <Button>Upload New</Button>
          <Button color="primary">Save</Button>
        </div>
      </div>

      <div className="float-left w-[calc(50%-8px)] rounded-xl bg-dark-2 p-4">
        <h2 className="text-lg font-medium">Bio</h2>
        <Textarea fullWidth placeholder="Enter your description" className="" />
      </div>

      <div className="float-left mt-4 w-[calc(50%-8px)] rounded-xl bg-dark-2 p-4">
        <h2 className="mb-1 text-lg font-medium">Personal Information</h2>
        <form>
          <Input
            labelPlacement="outside"
            placeholder="Some name here"
            value={userProfile.fullName || userProfile.username}
            label="Full Name"
            name="fullName"
            required
            size="lg"
          />
        </form>
      </div>
    </div>
  )
}

export default EditProfile
