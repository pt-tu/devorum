'use client'
import React from 'react'
import NewPostEditor from '../NewPostEditor'
import useCommunityData from '@/hooks/useCommunityData'
import { useParams } from 'next/navigation'

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
