import { HorizontalNav } from '@/components'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="relative m-auto grid max-w-7xl grid-cols-12 gap-5 pt-5">
        <div className="relative col-span-2 h-screen">
          <HorizontalNav />
        </div>
        {children}
        <div className="col-span-3">
          <HorizontalNav />
        </div>
      </div>
    </section>
  )
}
