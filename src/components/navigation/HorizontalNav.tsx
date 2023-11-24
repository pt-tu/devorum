'use client'
import React from 'react'
import GroupItemNav from './GroupItemNav'
import classNames from 'classnames'
import { useMenuStore } from '@/store/useMenuStore'

interface Props {
  className?: classNames.Argument
}

export default function HorizontalNav(props: Props) {
  const { className } = props
  const { items } = useMenuStore()
  return (
    <div className="sticky w-full">
      <div>
        {items.map((item, index) => (
          <GroupItemNav {...item} key={item.id} />
        ))}
      </div>
    </div>
  )
}
