import { getCommunityService } from '@/services/communityService'
import { Community } from '@/types/community.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'

const useRoomData = (community: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWR<Community, AxiosError>('getCommunityData', () =>
    getCommunityService(community).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useRoomData
