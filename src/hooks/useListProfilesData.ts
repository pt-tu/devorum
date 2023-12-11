import { listProfilesService } from '@/services/userService'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'

const useListProfilesData = () => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWR<User[], AxiosError>('listProfilesData', () =>
    listProfilesService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListProfilesData
