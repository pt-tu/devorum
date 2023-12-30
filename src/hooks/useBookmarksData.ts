import { listBookmarkService } from '@/services/postSevice'
import { listProfilesService } from '@/services/userService'
import { useUserStore } from '@/store/useUserStore'
import { Post, Posts } from '@/types/post.type'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useBookmarksData = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const { isLoading, error, data, mutate } = useSWRImmutable<Post[], AxiosError>(['listBookmarksData', user], () =>
    listBookmarkService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useBookmarksData
