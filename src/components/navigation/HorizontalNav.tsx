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
    <div className={classNames('relative col-span-2 h-full overflow-hidden bg-dark-1', className)}>
      {/* <div className="absolute -right-[17px] left-0 top-0 flex h-full flex-col gap-y-5 overflow-y-scroll"> */}
      <div className="flex h-full flex-col gap-y-5">
        {items.map((item) => (
          <GroupItemNav {...item} key={item.id} />
        ))}
      </div>
    </div>
  )
}
