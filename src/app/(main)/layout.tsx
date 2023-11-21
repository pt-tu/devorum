import { Header } from '@/components'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="relative pt-5">{children}</div>
    </section>
  )
}
