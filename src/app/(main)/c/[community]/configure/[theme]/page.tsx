'use client'
import CommunityHeader from '@/components/community/CommunityHeader'
import useCommunityData from '@/hooks/useCommunityData'
import { uploadFileService } from '@/services/uploadService'
import { Community } from '@/types/community.type'
import { Button, Divider, Spinner } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community

  const ref = useRef<HTMLInputElement | null>(null)
  const bannerRef = useRef<HTMLInputElement | null>(null)
  const [uploadPhoto, setUploadPhoto] = useState<File>()
  const [uploadBanner, setUploadBanner] = useState<File>()

  const { isLoading, data } = useCommunityData(community)
  const [loading, setLoading] = useState(false)

  const communityData: Community = useMemo(() => {
    const newData = { ...data }
    if (uploadPhoto) {
      newData.photo = URL.createObjectURL(uploadPhoto)
    }
    if (uploadBanner) {
      newData.banner = URL.createObjectURL(uploadBanner)
    }
    return newData as Community
  }, [data, uploadBanner, uploadPhoto])

  if (isLoading || !data || !communityData)
    return (
      <div className="h-min-[400px] flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const handleFileChange = (target: 'photo' | 'banner') => (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (target === 'photo' && files) {
      setUploadPhoto(files[0])
    }
    if (target === 'banner' && files) {
      setUploadBanner(files[0])
    }
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

  const onSaveHandler = async () => {
    setLoading(true)

    if (uploadPhoto) {
      await uploadImage(uploadPhoto)
    }
    if (uploadBanner) {
      await uploadImage(uploadBanner)
    }

    setLoading(false)
  }

  return (
    <>
      <input onChange={handleFileChange('photo')} ref={ref} type="file" className="hidden" />
      <input onChange={handleFileChange('banner')} ref={bannerRef} type="file" className="hidden" />
      <title>Theming community</title>
      <div className="w-full space-y-6 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Theming `{community}` community</h1>
        <Divider />
        <CommunityHeader isTheming data={communityData} community={community} />
        <Divider />
        <div className="flex gap-6">
          <Button size="lg" variant="flat" onClick={() => ref.current?.click()}>
            Change Photo
          </Button>
          <Button size="lg" onClick={() => bannerRef.current?.click()} variant="flat">
            Change Banner
          </Button>
        </div>
      </div>

      <Button
        isLoading={loading}
        isDisabled={!uploadPhoto && !uploadBanner}
        onClick={onSaveHandler}
        size="lg"
        color="primary"
        className="mt-6"
      >
        Save Changes
      </Button>
    </>
  )
}

export default ConfigureTheme