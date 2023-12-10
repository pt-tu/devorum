import useCommunityData from '@/hooks/useCommunityData'
import useUserTitlesData from '@/hooks/useUserTitlesData'
import { selfUpdateCommunityStatusService } from '@/services/communityService'
import { Community } from '@/types/community.type'
import { Radio, RadioGroup, Button } from '@nextui-org/react'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'

type Props = {
  community: string
  onClose: () => void
}

const EditTitle = ({ community, onClose }: Props) => {
  const { data, mutate } = useCommunityData(community)
  const [currentTitle, setCurrentTitle] = useState<string>()
  const { data: userTitlesData } = useUserTitlesData(community)

  useEffect(() => {
    setCurrentTitle(data?.joinedStatus?.title?._id)
  }, [data])

  const isDisabled = useMemo(() => {
    return currentTitle === data?.joinedStatus?.title?._id
  }, [currentTitle, data?.joinedStatus?.title?._id])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value)
  }

  const onSaveHandler = async () => {
    try {
      await selfUpdateCommunityStatusService(community, { title: currentTitle })
      mutate()
      onClose()
    } catch (error) {
      console.log('save title error', error)
    }
  }

  if (!Array.isArray(userTitlesData)) {
    return null
  }

  return (
    <div className="text-sm">
      <RadioGroup label="Select your title" className="mt-4" value={currentTitle} onChange={onChangeHandler}>
        {userTitlesData.map((title) => (
          <Radio key={title._id} value={title._id}>
            <p className="text-sm">{title.name}</p>
          </Radio>
        ))}
        <div className="flex"></div>
      </RadioGroup>
      <div className="mt-4 flex items-center gap-3">
        <Button onClick={onSaveHandler} color="primary" isDisabled={isDisabled}>
          Save
        </Button>
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default EditTitle
