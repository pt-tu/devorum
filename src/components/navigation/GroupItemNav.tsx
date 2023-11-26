import React from 'react'
import { ItemNav } from '..'
import { DownArrow, UpArrow } from '@/assets'
import { NavItemProps, useMenuStore } from '@/store/useMenuStore'

export default function GroupItemNav(items: NavItemProps) {
  const { toggleExpand } = useMenuStore()

  return (
    <div className="mb-5 gap-y-3 rounded-2xl bg-dark-2 p-3">
      {items.title && (
        <div className="flex flex-row items-center" onClick={() => toggleExpand(items.id)}>
          <p className="pointer-events-none my-2 ml-2 flex flex-1 text-base font-semibold text-gray-bg">
            {items.title}
          </p>
          <div>
            {items.expand ? (
              <UpArrow fill={'rgb(var(--color-gray-bg)'} width={24} height={24} />
            ) : (
              <DownArrow fill={'rgb(var(--color-gray-bg)'} width={24} height={24} />
            )}
          </div>
        </div>
      )}
      {items.expand && items.children?.map((item) => <ItemNav {...item} key={item.id} />)}
    </div>
  )
}
