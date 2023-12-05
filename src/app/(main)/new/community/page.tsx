'use client'

import { createCommunityService } from '@/services/communityService'
import { NewCommunity } from '@/types/community.type'
import { Button, Checkbox, Input, Radio, RadioGroup, Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'

const NewCommunity = () => {
  const [communityData, setCommunityData] = useState<NewCommunity>({
    name: '',
    visibility: 'public',
    scrutinizeToPost: false,
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState<boolean | null>(true)

  const getStatusIndicator = () => {
    if (loading) {
      return <Spinner className="scale-75" />
    }
    if (valid === true) {
      return <FaCheck className="text-green-500" />
    }
    if (valid === false) {
      return <RxCross2 className="text-red-500" />
    }
    return null
  }

  const createCommunityHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      await createCommunityService(communityData)
      router.push('/c/' + communityData.name)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeHandler = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityData((prev) => ({ ...prev, [name]: e.target.value }))
  }

  console.log(communityData)

  return (
    <>
      <h1 className="mt-8 text-4xl font-semibold">Create new community</h1>
      <form onSubmit={createCommunityHandler}>
        <div className="mt-6 space-y-8 rounded-xl bg-dark-2 p-8">
          <Input
            value={communityData.name}
            onChange={onChangeHandler('name')}
            endContent={getStatusIndicator()}
            size="lg"
            type="text"
            placeholder="Community name cannot be changed."
            label={<p className="text-base font-medium">Community Name</p>}
            labelPlacement="outside"
          />
          <div>
            <p className="font-medium">Community Visibility</p>
            <RadioGroup onChange={onChangeHandler('visibility')} value={communityData.visibility} className="mt-2">
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </RadioGroup>
          </div>

          <div>
            <p className="font-medium">Other</p>
            <Checkbox
              className="mt-0"
              checked={communityData.scrutinizeToPost}
              onChange={(e) => setCommunityData((prev) => ({ ...prev, scrutinizeToPost: e.target.checked }))}
            >
              Scrutinize content before posting
            </Checkbox>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Button isDisabled={!valid || !communityData.name} type="submit" size="lg" color="primary">
            Create Community
          </Button>
          <Button size="lg" variant="flat">
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default NewCommunity
