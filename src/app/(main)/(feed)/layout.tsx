import { LeftMenu, RightMenu } from '@/components'
import { useMenuStore } from '@/store/useMenuStore'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="relative m-auto flex max-w-7xl gap-x-5 px-8 pt-8">
        <LeftMenu />
        <div className="h-[full] min-w-0 flex-[8]">{children}</div>
        {/* <RightMenu /> */}
      </div>
    </section>
  )
}
