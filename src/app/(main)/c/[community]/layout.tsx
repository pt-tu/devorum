'use client'

import PrivateLayout from '@/components/layouts/PrivateLayout'
import useCommunityData from '@/hooks/useCommunityData'
import { Fragment, useEffect } from 'react'

export default function CommunityDetailLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { data } = useCommunityData(params.community)

  const Wrapper = !data || data.visibility === 'public' ? Fragment : PrivateLayout

  return (
    <Wrapper>
      <section>
        <div className="m-auto max-w-7xl pl-3">{children}</div>
      </section>
    </Wrapper>
  )
}
