import { useCallback, useEffect, useMemo, useState } from 'react'

function useInfiniteScrollData<T>(data: T[], message?: string, initLimit?: number) {
  const [limit, setLimit] = useState(10)

  const limitData = useMemo(() => {
    return data.slice(0, limit)
  }, [data, limit])

  const hasMore = useMemo(() => {
    return limitData.length < data.length
  }, [data.length, limitData.length])

  const releaseData = useCallback(async () => {
    console.log('releaseData', message)
    await new Promise((resolve) => {
      setTimeout(() => {
        setLimit((prev) => prev + 10)
        resolve(true)
      }, 1500)
    })
  }, [message])

  return { limitData, releaseData, hasMore }
}

export default useInfiniteScrollData
