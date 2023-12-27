import { listRoomsService } from '@/services/chatService'
import { getCommunityService } from '@/services/communityService'
import { Room } from '@/types/chat.type'
import { Community } from '@/types/community.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useCommunityData = (community: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<Community, AxiosError>(
    // Key is not a string anymore, but an array. Note that the community parameter is passed here
    ['getCommunityData', community],
    // Here we take the community parameter out as 'communityKey' and use it to fetch the data
    ([, communityKey]) => getCommunityService(communityKey as string).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useCommunityData
