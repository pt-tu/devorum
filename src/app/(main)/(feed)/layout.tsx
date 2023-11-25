'use client'

import { HorizontalNav } from '@/components'
import { useMenuStore } from '@/store/useMenuStore'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { items, users } = useMenuStore()

  return (
    <section>
      <div className="relative m-auto grid max-w-[1728px] grid-cols-12 gap-5 pt-5">
        <div className="relative col-span-3 h-screen">
          <HorizontalNav items={items} />
        </div>
        {children}
        <div className="col-span-3">
          <HorizontalNav items={users} />
        </div>
      </div>
    </section>
  )
}
