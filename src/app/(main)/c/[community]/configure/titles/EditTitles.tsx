import TitleChip from '@/components/community/TitleChip'
import useCommunityData from '@/hooks/useCommunityData'
import { Button, Spinner } from '@nextui-org/react'
import _ from 'lodash'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import TitleForm from './TitleForm'
import useUserTitlesData from '@/hooks/useUserTitlesData'
import { UserTitle } from '@/types/community.type'
import { deleteUserTitleService } from '@/services/communityService'
import { mutate } from 'swr'

type Props = {
  community: string
}

const EditTitles = ({ community }: Props) => {
  const [showForm, setShowForm] = useState(false)
  const [currentEdit, setCurrentEdit] = useState<number>(-1)
  const { data, isLoading, mutate } = useUserTitlesData(community)

  if (!data || isLoading)
    return (
      <div className="flex h-[120px] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const onCancelHandler = () => {
    setShowForm(false)
  }

  const onChipSelect = (index: number) => () => {
    if (currentEdit === index) {
      setShowForm(false)
      return setCurrentEdit(-1)
    }

    setShowForm(true)
    setCurrentEdit(index)
  }

  const newTitleClickHandler = () => {
    if (currentEdit === -1) {
      setShowForm((prev) => !prev)
    } else {
      setCurrentEdit(-1)
      setShowForm(true)
    }
  }

  const deleteChipHandler = (id: string) => async () => {
    try {
      await deleteUserTitleService(community, id)
      setShowForm(false)
      setCurrentEdit(-1)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {Array.isArray(data) &&
          data.map((title, index) => (
            <TitleChip
              onDelete={deleteChipHandler(title._id)}
              onClick={onChipSelect(index)}
              data={title}
              key={title._id}
            />
          ))}
        <Button radius="full" className="h-14" onClick={newTitleClickHandler}>
          <GoPlus className="text-2xl" />
        </Button>
      </div>
      {showForm && (
        <TitleForm data={currentEdit !== -1 && data[currentEdit]} community={community} onCancel={onCancelHandler} />
      )}
    </>
  )
}

export default EditTitles
