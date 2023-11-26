'use client'
import React from 'react'
import { HorizontalNav } from '..'
import { useMenuStore } from '@/store/useMenuStore'
import { Input } from '@nextui-org/react'
import { Search } from '@/assets'

function RightMenu() {
  const { filterUsers, setFilterUsers } = useMenuStore()
  const onSearch = (input: string) => setFilterUsers(input)

  return (
    <div className="fixed bottom-0 right-0 top-24 w-1/5 overflow-y-scroll">
      <div className="h-fit rounded-2xl bg-dark-2 pt-3">
        <p className="pointer-events-none my-2 ml-5 flex flex-1 text-base font-semibold text-gray-bg">
          {'Recent users'}
        </p>
        <div className="mx-5">
          <Input
            placeholder="Find user"
            onChange={(e) => onSearch(e.target.value)}
            isClearable
            onClear={() => onSearch('')}
            className="max-w-full"
          />
        </div>

        <HorizontalNav items={filterUsers} />
      </div>
    </div>
  )
}

export default RightMenu
