import { listPostService } from '@/services/postSevice'
import { Posts } from '@/types/post.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const usePostsData = (page: number, size?: number) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<Posts, AxiosError>('postsData', () =>
    listPostService(page, size).then((res) => res.data),
  )
  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default usePostsData
