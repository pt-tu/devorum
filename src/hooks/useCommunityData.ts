import { getCommunityService } from '@/services/communityService'
import { Community } from '@/types/community.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

const useCommunityData = (community: string) => {
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

  return { isLoading, error, data }
}

export default useCommunityData
