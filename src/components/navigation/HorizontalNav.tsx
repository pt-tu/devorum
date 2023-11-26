'use client'
import React, { useEffect, useState } from 'react'
import GroupItemNav from './GroupItemNav'
import classNames from 'classnames'
import { NavItemProps, useMenuStore } from '@/store/useMenuStore'

interface Props {
  className?: classNames.Argument
  items: NavItemProps[]
}

export default function HorizontalNav(props: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const { className, items } = props
  return (
    mounted && (
      <div className={classNames(className)}>
        {items.map((item, index) => (
          <GroupItemNav {...item} key={item.id} />
        ))}
      </div>
    )
  )
}
