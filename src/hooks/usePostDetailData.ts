import { getCommunityMembersService, getCommunityService } from '@/services/communityService'
import { getPostService } from '@/services/postSevice'
import { Community, JoinedUser } from '@/types/community.type'
import { Post } from '@/types/post.type'
import { User } from '@/types/user.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const usePostDetailData = (id: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<Post, AxiosError>(['getPostDetail', id], ([, idKey]) =>
    getPostService(idKey as string).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default usePostDetailData
