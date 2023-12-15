'use client'

import ThemeButton from '@/components/common/ThemeButton'
import User from '@/components/navigation/User'
import { useThemeStore } from '@/store/useThemeStore'
import { Button, Card, CardBody } from '@nextui-org/react'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const Dev = () => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <>
      <div className="flex justify-end gap-4 py-2">
        <User size="sm" />
        <ThemeButton size="sm" />
      </div>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center gap-10">
        <Card>
          <CardBody className="p-0">
            <Button
              as={Link}
              href="/dev/play"
              variant="flat"
              className={classNames('p-24', theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')}
              size="lg"
            >
              <p className="text-4xl font-semibold">Play</p>
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-0">
            <Button
              as={Link}
              href="/dev/live"
              variant="flat"
              className={classNames('p-24', theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')}
              size="lg"
            >
              <p className="text-4xl font-semibold">Live</p>
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Dev
