'use client'

import PrivateLayout from '@/components/layouts/PrivateLayout'

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <title>Dev Playground</title>
      {children}
    </section>
  )
}
