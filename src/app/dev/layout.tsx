import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dev Playground',
  description: 'Build things with ease',
}

const DevLayout = ({ children }: { children: React.ReactNode }) => {
  return <section>{children}</section>
}

export default DevLayout
