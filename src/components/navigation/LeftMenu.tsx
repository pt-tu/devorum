'use client'
import React from 'react'
import { HorizontalNav } from '..'
import { useMenuStore } from '@/store/useMenuStore'

function LeftMenu() {
  const { items } = useMenuStore()

  return (
    <div className="sticky bottom-0 left-8 top-28 col-span-3 flex-[3] flex-shrink-0 self-start">
      <HorizontalNav items={items} />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-40 m-auto h-full max-w-7xl">
        <div className="absolute left-[29%] h-[calc(100vh-80px)] border-r border-gray-4/20 " />
      </div>
    </div>
  )
}

export default LeftMenu
