'use client'
import { Spinner } from '@nextui-org/react'
import { getCommunityService } from '@/services/communityService'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useQuery } from 'react-query'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Community } from '@/types/community.type'
import CommunityHeader from '@/components/community/CommunityHeader'
import CommunityOverviewBar from '@/components/community/CommunityOverviewBar'
import CommunityContent from '@/components/community/CommunityContent'

const Community = ({ params }: { params: Params }) => {
  const { community } = params
  const router = useRouter()
  const { isLoading, error, data } = useQuery<Community, AxiosError>('getCommunityData', () =>
    getCommunityService(community).then((res) => res.data),
  )

  useEffect(() => {
    console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

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
