import { listCommentsService } from '@/services/commentService'
import { listBannedUsersService } from '@/services/communityService'
import { BannedUser } from '@/types/ban.type'
import { Comment, CommentList } from '@/types/comment.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useListCommentsData = (postId: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<CommentList, AxiosError>(
    ['listCommentServices', postId],
    ([, postIdKey]) => listCommentsService(postIdKey as string).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListCommentsData
