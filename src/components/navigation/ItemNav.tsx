'use client'
import { NavItemProps, useMenuStore } from '@/store/useMenuStore'
import { Image } from '@nextui-org/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ItemNav(props: NavItemProps) {
  const { isSelected, setIsSelected } = useMenuStore()
  const router = useRouter()
  const [checkSelected, setCheckSelected] = useState(props.id === isSelected)
  useEffect(() => {
    setCheckSelected(props.id === isSelected)
  }, [isSelected])

  const handleOnClick = () => {
    if (props.canSelected) {
      setIsSelected(props.id)
      router.push(props.path)
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className={classNames(
        'flex h-fit max-w-full cursor-pointer flex-row items-center gap-2 rounded-xl py-2 pl-3',
        checkSelected ? 'bg-orange-8 hover:bg-orange-bg' : 'hover:bg-dark-4',
      )}
    >
      {typeof props.icon === 'string' ? (
        <Image className="h-9 w-9 rounded-full" alt="devorum_avt" src={props.icon} />
      ) : (
        props.icon
      )}
      <div className="w-2/3 justify-between">
        <p className={classNames('max-w-full text-sm font-semibold', checkSelected ? 'text-white' : 'text-gray-bg')}>
          {props.title}
        </p>
        <p
          className={classNames(
            'max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-normal text-gray-3',
            checkSelected ? 'text-white' : 'text-gray-3',
          )}
        >
          {props.subTitle}
        </p>
      </div>
    </div>
  )
}
