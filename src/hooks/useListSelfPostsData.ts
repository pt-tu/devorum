import { listSelfPostsService } from '@/services/postSevice'
import { listReportsService } from '@/services/reportService'
import { useUserStore } from '@/store/useUserStore'
import { Posts } from '@/types/post.type'
import { Report } from '@/types/report.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useListSelfPostsData = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const { isLoading, error, data, mutate } = useSWRImmutable<Posts, AxiosError>(['listSelfPosts', user?.username], () =>
    listSelfPostsService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListSelfPostsData
