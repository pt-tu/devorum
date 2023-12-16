'use client'
import React from 'react'

const LiveRoomLayout = ({ children, params }: { children: React.ReactNode; params: any }) => {
  const id = params.id

  return <section>{children}</section>
}

export default LiveRoomLayout
