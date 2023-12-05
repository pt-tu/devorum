'use client'
import Sidebar from '@/components/common/Sidebar'
import { Button } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export default function ConfigureCommunityLayout({ children }: { children: React.ReactNode }) {
  const { community } = useParams()
  const list = [
    { name: 'Overview', path: `/c/${community}/configure` },
    { name: 'Theme', path: `/c/${community}/configure/theme` },
  ]

  return (
    <section>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Sidebar list={list} />
          <Button fullWidth color="primary" className="mt-6">
            Save Changes
          </Button>
        </div>
        {children}
      </div>
    </section>
  )
}
