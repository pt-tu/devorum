'use client'

import ForbiddenModal from '@/components/common/ForbiddenModal'
import useCommunityData from '@/hooks/useCommunityData'
import { useUserStore } from '@/store/useUserStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const { community } = useParams()
  const user = useUserStore((state) => state.user)
  const { data } = useCommunityData(community as string)
  const router = useRouter()

  useEffect(() => {
    if (data?.visibility === 'private') {
      if (user && (data?.createdBy === user._id || data?.allowUsers.includes(user.username))) {
        return
      }
      setOpen(true)
    }
  }, [user, data])

  if (user === undefined) {
    return null
  }

  return (
    <section>
      <title>Community</title>
      <div className="m-auto max-w-7xl pl-3">{children}</div>
      <ForbiddenModal
        isOpen={isOpen}
        header="Private Section Ahead"
        primary="Login another account"
        onPrimary={() => router.push('/login')}
        onSecondary={() => router.back()}
        secondary="Back"
        body="You need permissions to access this section. Please login using another account."
      />
    </section>
  )
}
