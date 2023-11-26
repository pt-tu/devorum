'use client'
import React, { useEffect, useRef } from 'react'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { User } from '@/types/user.type'
import useResizeObserver from '@react-hook/resize-observer'
import { blockUserService, followUserService, unfollowUserService } from '@/services/userService'
import InteractionSection from './InteractionSection'
import TrophySection from './TrophySection'

type Props = {
  setBarHeight: (v: number) => void
  userProfile: User
  fetchUserProfile: () => Promise<void>
}

const OverviewBar = ({ setBarHeight, fetchUserProfile, userProfile }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useResizeObserver(ref, (entry) => setBarHeight(entry.target.clientHeight))

  return (
    <div className="sticky top-24 grid grid-cols-12" ref={ref}>
      <div className="col-span-4 space-y-4">
        <InteractionSection fetchUserProfile={fetchUserProfile} userProfile={userProfile} />
        <TrophySection />

        <div className="h-4" />
      </div>
    </div>
  )
}

export default OverviewBar
