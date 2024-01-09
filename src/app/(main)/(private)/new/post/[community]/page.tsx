'use client'
import React from 'react'
import useCommunityData from '@/hooks/useCommunityData'
import { useParams } from 'next/navigation'
import NewPostEditor from '@/components/editor/NewPostEditor'

const NewPostCommunity = () => {
  const { community } = useParams()
  const { data } = useCommunityData(community as string)

  if (!data) return null

  return (
    <div className="my-8">
      <NewPostEditor data={data} />
    </div>
  )
}

export default NewPostCommunity
