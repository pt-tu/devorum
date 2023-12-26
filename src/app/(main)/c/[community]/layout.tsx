'use client'

import PrivateLayout from '@/components/layouts/PrivateLayout'
import useCommunityBannedUsersData from '@/hooks/useCommunityBannedUsersData'
import useCommunityData from '@/hooks/useCommunityData'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'

export default function CommunityDetailLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { data } = useCommunityData(params.community)
  const { data: bannedUsersData } = useCommunityBannedUsersData(params.community)
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  const Wrapper = !data || data.visibility === 'public' ? Fragment : PrivateLayout

  useEffect(() => {
    if (!bannedUsersData || !data) return

    if (bannedUsersData.find((banned) => banned.username === user?.username)) {
      router.push(`/not-found`)
    }
  }, [bannedUsersData, data, router, user])

  if (!data || !bannedUsersData || user === undefined) return null

  return (
    <Wrapper>
      <section>
        <div className="m-auto max-w-7xl pl-3">{children}</div>
      </section>
    </Wrapper>
  )
}
