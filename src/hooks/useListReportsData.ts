import { listReportsService } from '@/services/reportService'
import { Report } from '@/types/report.type'
import { AxiosError, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

const useListReportsData = () => {
  const router = useRouter()
  const { isLoading, error, data, mutate } = useSWRImmutable<Report[], AxiosError>('listReportssData', () =>
    listReportsService().then((res) => res.data),
  )

  useEffect(() => {
    if (error) console.log('error', error)
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push('/not-found')
    }
  }, [error, router])

  return { isLoading, error, data, mutate }
}

export default useListReportsData
