import { listAllCommunitiesService, listCommunitiesService } from '@/services/communityService'
import { listProfilesService } from '@/services/userService'
import { Community } from '@/types/community.type'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useListAllCommunitiesData = () => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<Community[], AxiosError>('listAllCommunities', () =>
    listAllCommunitiesService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListAllCommunitiesData
