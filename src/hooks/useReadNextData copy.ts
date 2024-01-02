import { listPostService, listReadNextPostsService, listRecommendedPostsService } from '@/services/postSevice'
import { Posts } from '@/types/post.type'
import { AxiosError, isAxiosError } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useReadNextData = (postId: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<Posts, AxiosError>(['readNextPostData', postId], () =>
    listReadNextPostsService(postId).then((res) => res.data),
  )
  useEffect(() => {
    if (error) console.log('error', error)
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useReadNextData
