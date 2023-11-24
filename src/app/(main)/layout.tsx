import { Header } from '@/components'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      <div className="h-20" />
      {children}
    </section>
  )
}

export default MainLayout
