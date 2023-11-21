import { NavItemProps } from '@/store/useMenuStore'
import Link from 'next/link'
import React from 'react'

export default function ItemNav(item: NavItemProps) {
  return (
    <Link
      href={item.path}
      className="flex h-fit w-full max-w-full flex-row items-center gap-2 rounded-md py-2 pl-2 hover:bg-dark-4"
    >
      <div className="h-8 w-8 rounded-md bg-orange-8" />
      <div className="w-2/3 justify-between">
        <p className="text-sm font-semibold text-gray-bg">{item.title}</p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-normal text-gray-3">
          {item.subTitle}
        </p>
      </div>
    </Link>
  )
}
