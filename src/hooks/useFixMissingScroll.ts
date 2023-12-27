import { useCallback, useEffect, useMemo } from 'react'

type Props = {
  hasMoreItems: boolean
  fetchMoreItems: () => Promise<void>
  element: HTMLDivElement | null
}

function useFixMissingScroll({ hasMoreItems, fetchMoreItems, element }: Props) {
  const fetchCb = useCallback(() => {
    fetchMoreItems()
  }, [fetchMoreItems])

  useEffect(() => {
    const hasScroll = element ? element.scrollHeight > element.clientHeight : true
    if (!hasScroll && hasMoreItems) {
      setTimeout(() => {
        fetchCb()
      }, 100)
    }
  }, [hasMoreItems, fetchCb, element])
}

export default useFixMissingScroll