import { listUserTitlesService } from '@/services/communityService'
import { UserTitle } from '@/types/community.type'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import useSWR from 'swr'

const useUserTitlesData = (community: string) => {
  const { isLoading, error, data, mutate } = useSWR<UserTitle[], AxiosError>('listUserTitlesService', () =>
    listUserTitlesService(community).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
  }, [error])

  return { isLoading, error, data, mutate }
}

export default useUserTitlesData
