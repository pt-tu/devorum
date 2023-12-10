'use client'
import React, { useRef } from 'react'
import { User } from '@/types/user.type'
import InteractionSection from './InteractionSection'
import TrophySection from './TrophySection'

type Props = {
  userProfile: User
  fetchUserProfile: () => Promise<void>
}

const OverviewBar = ({ fetchUserProfile, userProfile }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="sticky top-24 col-span-4 self-start" ref={ref}>
      <div className="col-span-4 space-y-4">
        <InteractionSection fetchUserProfile={fetchUserProfile} userProfile={userProfile} />
        <TrophySection />

        <div className="h-4" />
      </div>
    </div>
  )
}

export default OverviewBar
