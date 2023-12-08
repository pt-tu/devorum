'use client'
import Sidebar from '@/components/common/Sidebar'
import PrivateLayout from '@/components/layouts/PrivateLayout'
import { useParams } from 'next/navigation'

export default function ConfigureCommunityLayout({ children }: { children: React.ReactNode }) {
  const { community } = useParams()
  const list = [
    { name: 'Overview', path: `/c/${community}/configure` },
    { name: 'Theme', path: `/c/${community}/configure/theme` },
    { name: 'User titles', path: `/c/${community}/configure/titles` },
    { name: 'Rules & Resources', path: `/c/${community}/configure/rules-resources` },
    { name: 'Moderators', path: `/c/${community}/configure/mods` },
  ]

  return (
    <PrivateLayout>
      <section>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Sidebar list={list} />
          </div>
          {children}
        </div>
      </section>
    </PrivateLayout>
  )
}
