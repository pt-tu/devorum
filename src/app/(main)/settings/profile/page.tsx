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
import { uploadFileService } from '@/services/uploadService'

const EditProfile = () => {
  const [data, setData] = useState<User>()
  const [uploadedFile, setUploadedFile] = useState<File>()
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

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await uploadFileService(formData)
      return response.data.url
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      const updatedData = { ...data }
      if (data.avatar?.startsWith('blob:') && uploadedFile) {
        const url = await uploadImage(uploadedFile)
        updatedData.avatar = url
      }
      if (data.banner?.startsWith('blob:') && uploadedFile) {
        const url = await uploadImage(uploadedFile)
        updatedData.banner = url
      }
      await updateProfileService(updatedData)
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
          setUploadedFile={setUploadedFile}
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
