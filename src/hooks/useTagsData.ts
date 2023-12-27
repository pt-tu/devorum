import { listTagService } from '@/services/tagService'
import { Tag } from '@/types/post.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useTagsData = (names?: string[], include?: string) => {
  const router = useRouter()

  let query = ''
  if (names)
    names.forEach((name) => {
      query += `names=${name}&`
    })
  if (include) query += `include=${include}`

  const { isLoading, error, data, mutate } = useSWRImmutable<Tag[], AxiosError>(['posts/tags', query], ([, queryKey]) =>
    listTagService(queryKey as string).then((res) => res.data),
  )
  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useTagsData
