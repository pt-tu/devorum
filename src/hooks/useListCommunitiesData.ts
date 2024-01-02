import { listCommunitiesService } from '@/services/communityService'
import { listProfilesService } from '@/services/userService'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useListCommunitiesData = () => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<string[], AxiosError>('listCommunities', () =>
    listCommunitiesService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListCommunitiesData
