'use client'
import { useUserStore } from '@/store/useUserStore'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react'

import YourPicture from '@/components/userProfile/YourPicture'
import PersonalInformation from '@/components/userProfile/PersonalInformation'
import Bio from '@/components/userProfile/Bio'
import SocialMediaPaths from '@/components/userProfile/SocialMediaPaths'
import Background from '@/components/userProfile/Background'
import { ChangeEvent, useEffect, useState } from 'react'
import { User } from '@/types/user.type'
import { updateProfileService } from '@/services/userService'
import { useRouter } from 'next/navigation'

const EditProfile = () => {
  const [data, setData] = useState<User>()
  const [contentHasChanged, setContentHasChanged] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const userProfile = useUserStore((state) => state.user)
  useEffect(() => {
    if (userProfile) {
      setData(userProfile)
    }
  }, [userProfile])

  if (!userProfile || !data)
    return (
      <div className="col-span-9 flex items-center justify-center">
        <Spinner />
      </div>
    )

  const handleChange = (target: keyof User) => (e: ChangeEvent<HTMLInputElement>) => {
    setData(
      (prev) =>
        ({
          ...prev,
          [target]: e.target.value,
        }) as User,
    )
    setContentHasChanged(true)
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      await updateProfileService(data)
      setContentHasChanged(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-span-9">
      <div className=" columns-2 space-y-4">
        <YourPicture
          setUserProfile={(user: User) => {
            setData(user)
            setContentHasChanged(true)
          }}
          userProfile={data}
        />
        <PersonalInformation handleChange={handleChange} userProfile={data} />
        <SocialMediaPaths handleChange={handleChange} userProfile={data} />
        <Bio handleChange={handleChange} userProfile={data} />
        <Background handleChange={handleChange} userProfile={data} />
      </div>
      <Button
        isLoading={loading}
        isDisabled={!contentHasChanged}
        onClick={updateProfile}
        color="primary"
        className="mt-4"
      >
        Save Changes
      </Button>
    </div>
  )
}

export default EditProfile
