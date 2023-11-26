import { LeftMenu, RightMenu } from '@/components'
import { useMenuStore } from '@/store/useMenuStore'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="relative m-auto grid max-w-[1728px] grid-cols-12 gap-5 pt-4">
        <LeftMenu />
        {children}
        <RightMenu />
      </div>
    </section>
  )
}
