'use client'
import { useUserStore } from '@/store/useUserStore'
import { Community } from '@/types/community.type'
import copyCurrentLink from '@/utils/copyCurrentLink'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'

type Props = {
  community: string
  data: Community
}

const CommunityHeader = ({ community, data }: Props) => {
  const user = useUserStore((state) => state.user)

  return (
    <>
      <div className="h-4"></div>
      <div className="relative">
        {/* Banner */}
        <div className="h-13 aspect-[9] w-full overflow-hidden rounded-xl bg-white">
          <Image
            width={1280}
            height={80}
            className="h-full w-full object-cover"
            src={
              data.banner ??
              'https://cals.cornell.edu/sites/default/files/styles/three_card_callout/public/2019-08/cool-gray.png?h=52f94bb2&itok=uzCe_O2M'
            }
            alt="community_banner"
          />
        </div>
        <div className="absolute left-4 top-1/2 flex h-[84px] w-[84px] translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-dark-1 p-1">
          <Image
            alt="community_icon"
            src={data.photo ?? 'https://www.ledr.com/colours/white.jpg'}
            height={80}
            width={80}
            className="h-full w-full rounded-full"
          />
        </div>
      </div>

      {/* Name */}
      <div className="flex items-end justify-between">
        <h1 className="ml-28 mt-4 text-3xl font-semibold">{community}</h1>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="bordered">
                    <BsThreeDots />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="mute">Mute community</DropdownItem>
                  <DropdownItem key="share" onClick={copyCurrentLink}>
                    Share link
                  </DropdownItem>
                  {data.createdBy === user?._id ? (
                    <DropdownItem key="leave">Leave community</DropdownItem>
                  ) : (
                    (null as any)
                  )}
                </DropdownMenu>
              </Dropdown>

              <Button isIconOnly variant="bordered">
                <IoIosNotifications className="text-xl" />
              </Button>
            </>
          )}

          {data.createdBy === user?._id ? (
            <Button color="primary" as={Link} href={`${community}/configure`}>
              <p className="text-base">Configure Community</p>
            </Button>
          ) : (
            <Button color="primary">
              <p className="text-base">Join</p>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default CommunityHeader
