import TitleChip from '@/components/community/TitleChip'
import useCommunityData from '@/hooks/useCommunityData'
import { Button, Spinner } from '@nextui-org/react'
import _ from 'lodash'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import TitleForm from './TitleForm'
import useUserTitlesData from '@/hooks/useUserTitlesData'

type Props = {
  community: string
}

const EditTitles = ({ community }: Props) => {
  const [showForm, setShowForm] = useState(false)
  const { data, isLoading } = useUserTitlesData(community)

  if (!data || isLoading)
    return (
      <div className="flex h-[120px] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const onCancelHandler = () => {
    setShowForm(false)
  }

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {Array.isArray(data) && data.map((title) => <TitleChip data={title} key={title._id} />)}
        <Button radius="full" className="h-14" onClick={() => setShowForm((prev) => !prev)}>
          <GoPlus className="text-2xl" />
        </Button>
      </div>
      {showForm && <TitleForm community={community} onCancel={onCancelHandler} />}
    </>
  )
}

export default EditTitles
