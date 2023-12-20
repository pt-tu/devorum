'use client'
import React from 'react'
import Report from '@/components/report/Report'

const DevLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <title>Dev Playground</title>
      {children}
      <Report />
    </section>
  )
}

export default DevLayout
