'use client'
import React from 'react'
import { HorizontalNav } from '..'
import { useMenuStore } from '@/store/useMenuStore'

function LeftMenu() {
  const { items } = useMenuStore()

  return (
    <div className="fixed bottom-0 left-4 top-24 w-1/5 overflow-y-scroll">
      <HorizontalNav items={items} />
    </div>
  )
}

export default LeftMenu
