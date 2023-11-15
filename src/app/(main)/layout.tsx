import { Header, HorizontalNav } from '@/components'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <div className="max-h-screen overflow-y-auto px-10 pt-5">
        <div className="h-20" />
        <HorizontalNav />
        <div className="m-auto grid max-w-7xl grid-cols-12 gap-5">
          <HorizontalNav />
          {children}
          <HorizontalNav className="col-span-3" />
        </div>
      </div>
    </section>
  )
}
