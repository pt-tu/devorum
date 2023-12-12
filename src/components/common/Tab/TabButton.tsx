import classNames from 'classnames'
import Link from 'next/link'
import React, { Key } from 'react'
import { ReactNode } from 'react'

function TabButton({ icon, label, isSelected, onClick }: TabProps) {
  return (
    <div
      className={classNames(
        'flex w-fit cursor-pointer flex-row items-center gap-[5px] rounded-full px-[10px] py-[5px] text-xs',
        isSelected ? 'bg-blue-primary text-white' : 'bg-gray-border text-gray-text',
      )}
      onClick={onClick}
    >
      {icon}
      <p className="whitespace-nowrap font-thin">{label}</p>
    </div>
  )
}

export default TabButton
export interface TabProps {
  key: Key
  icon?: ReactNode
  label: string
  isSelected?: boolean
  onClick?: () => void
}
