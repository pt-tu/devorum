import PrivateLayout from '@/components/layouts/PrivateLayout'
import React from 'react'

const LiveLayout = ({ children }: { children: React.ReactNode }) => {
  return <PrivateLayout>{children}</PrivateLayout>
}

export default LiveLayout
