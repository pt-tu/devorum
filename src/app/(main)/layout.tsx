import { Header, HorizontalNav } from '@/components'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="relative m-auto grid max-w-7xl grid-cols-12 gap-5 pt-5">
        <HorizontalNav />
        {children}
        <HorizontalNav className="col-span-3" />
      </div>
    </section>
  )
}
