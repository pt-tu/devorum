import { getLiveRoomService, listLiveRoomsService } from '@/services/liveService'
import { LiveRoom } from '@/types/live.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useLiveRoomDetailData = (id: string) => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<LiveRoom, AxiosError>('liveRoomDetail', () =>
    getLiveRoomService(id).then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useLiveRoomDetailData
