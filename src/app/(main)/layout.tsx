'use client'
import { Header } from '@/components'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      <div className="relative">
        <div className="h-20" />
        {children}
      </div>
    </section>
  )
}

export default MainLayout
