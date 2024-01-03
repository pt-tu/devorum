import { listJoinedStatusService } from '@/services/communityService'
import { listPostService, listRecommendedPostsService } from '@/services/postSevice'
import { JoinedStatus } from '@/types/community.type'
import { Posts } from '@/types/post.type'
import { AxiosError, isAxiosError } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useListStatusData = (community: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<JoinedStatus[], AxiosError>(
    ['listJoinedStatus', community],
    () => listJoinedStatusService(community as string).then((res) => res.data),
  )
  useEffect(() => {
    if (error) console.log('error', error)
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListStatusData
