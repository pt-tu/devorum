import { getCommunityMembersService, getCommunityService } from '@/services/communityService'
import { Community, JoinedUser } from '@/types/community.type'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'

const useCommunityMembersData = (community: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWR<JoinedUser[], AxiosError>('getCommunityMembersData', () =>
    getCommunityMembersService(community).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useCommunityMembersData
