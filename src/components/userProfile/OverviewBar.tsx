'use client'
import React, { useEffect, useRef } from 'react'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

type Props = {
  setBarHeight: (v: number) => void
}

const OverviewBar = ({ setBarHeight }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current?.clientHeight) {
      setBarHeight(ref.current.clientHeight)
    }
  }, [setBarHeight])

  const copyLinkToProfile = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="sticky top-24 grid grid-cols-12" ref={ref}>
      <div className="col-span-4 space-y-4">
        <div className="rounded-lg bg-dark-2">
          <Image
            alt="cover"
            className="h-28 rounded-t-lg object-cover"
            src="https://img.freepik.com/free-vector/abstract-scribble-icons-hand-drawn-doodle-coloring_179234-222.jpg"
            width={1280}
            height={384}
          />
          <div className="flex gap-2 p-4">
            <Button startContent={<IoMdAddCircleOutline />} color="primary">
              Follow
            </Button>
            <Button startContent={<AiOutlineMessage />}>Chat</Button>

            <Dropdown>
              <DropdownTrigger>
                <Button className="ml-auto" variant="light" isIconOnly>
                  <HiOutlineDotsHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="share" onClick={copyLinkToProfile}>
                  Share link
                </DropdownItem>
                <DropdownItem key="report">Report abuse</DropdownItem>
                <DropdownItem key="block" className="text-danger" color="danger">
                  Block @xptr
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="rounded-lg bg-dark-2">
          <h3 className="p-4 font-medium">Trophy</h3>

          {/* Divider */}
          <div className="w-full border-t border-dark-1" />

          {/* Trophy */}
          <div className="grid grid-cols-2 gap-7 px-7 py-4">
            <Tooltip content="Badge 1">
              <Image
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
                alt="badge_1"
                width={120}
                height={120}
                className="h-full w-full rounded-full"
              />
            </Tooltip>
            <Tooltip content="Badge 1">
              <Image
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
                alt="badge_1"
                width={120}
                height={120}
                className="h-full w-full rounded-full"
              />
            </Tooltip>
            <Tooltip content="Badge 1">
              <Image
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
                alt="badge_1"
                width={120}
                height={120}
                className="h-full w-full rounded-full"
              />
            </Tooltip>
            <Tooltip content="Badge 1">
              <Image
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
                alt="badge_1"
                width={120}
                height={120}
                className="h-full w-full rounded-full"
              />
            </Tooltip>
          </div>

          <Button variant="light" className="mx-4 mb-2 w-[calc(100%-32px)]">
            View all trophies
          </Button>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}

export default OverviewBar
