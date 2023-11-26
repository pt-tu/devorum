'use client'
import React, { useRef } from 'react'
import { HorizontalNav } from '..'
import { useMenuStore } from '@/store/useMenuStore'
import { Input, InputRef } from 'antd'
import { SearchProps } from 'antd/es/input/Search'

function RightMenu() {
  const { users } = useMenuStore()
  const { Search } = Input
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  return (
    <div className="fixed bottom-0 right-0 top-24 w-1/5 overflow-y-scroll">
      <div className="h-fit rounded-2xl bg-dark-2 pt-3">
        <p className="pointer-events-none my-2 ml-5 flex flex-1 text-base font-semibold text-gray-bg">
          {'Recent users'}
        </p>
        <div className="mx-5">
          <Search placeholder="Find user" onSearch={onSearch} allowClear size="middle" className="max-w-full" />
        </div>

        <HorizontalNav items={users} />
      </div>
    </div>
  )
}

export default RightMenu
