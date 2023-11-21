import { Header } from '@/components'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <div className="relative pt-5">
        <div className="h-20" />
        {children}
      </div>
    </section>
  )
}
