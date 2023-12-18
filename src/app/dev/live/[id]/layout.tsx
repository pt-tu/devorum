'use client'
import ForbiddenModal from '@/components/common/ForbiddenModal'
import useLiveRoomDetailData from '@/hooks/useLiveRoomDetailData'
import { useUserStore } from '@/store/useUserStore'
import { Spinner, useUser } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LiveRoomLayout = ({ children, params }: { children: React.ReactNode; params: any }) => {
  const id = params.id
  const user = useUserStore((state) => state.user)
  const { data, error } = useLiveRoomDetailData(id)
  const router = useRouter()

  console.log('live room fetching error:', error)
  console.log('data:', data)

  if (!data) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (
    data.visibility === 'private' &&
    data.owner !== user?.username &&
    !data.accessibleUsers?.includes(user?.username || '')
  ) {
    return (
      <ForbiddenModal
        isOpen={true}
        header="Private Section Ahead"
        primary="Register"
        onPrimary={() => router.push('/register')}
        onSecondary={() => router.back()}
        secondary="Back"
        body="You need permissions to access this section. Please login using another account"
      />
    )
  }

  return <section>{children}</section>
}

export default LiveRoomLayout
