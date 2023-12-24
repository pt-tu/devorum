import { Spinner } from '@nextui-org/react'
import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
  isEmpty?: boolean
  children?: ReactNode
  isLoading?: boolean
}
const EmptyStateWrapper = ({ isEmpty, isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-6">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isEmpty)
    return (
      <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-6">
        <Image src="/empty_state.svg" alt="empty" width={200} height={200} className="object-contain" />
        <p>You have no notifications.</p>
      </div>
    )

  return <>{children}</>
}

export default EmptyStateWrapper
