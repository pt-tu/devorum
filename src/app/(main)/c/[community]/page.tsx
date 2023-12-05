'use client'
import { Spinner } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import CommunityHeader from '@/components/community/CommunityHeader'
import CommunityOverviewBar from '@/components/community/CommunityOverviewBar'
import CommunityContent from '@/components/community/CommunityContent'
import useCommunityData from '@/hooks/useCommunityData'

const Community = ({ params }: { params: Params }) => {
  const { community } = params
  const { isLoading, data } = useCommunityData(community)

  if (isLoading || !data)
    return (
      <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <>
      <CommunityHeader data={data} community={community} />

      {/* Content */}
      <div className="grid grid-cols-12 gap-4 pt-4">
        <CommunityOverviewBar data={data} />
        <CommunityContent />
      </div>
    </>
  )
}

export default Community
