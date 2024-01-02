'use client'
import React from 'react'
import { HorizontalNav } from '..'
import { useMenuStore } from '@/store/useMenuStore'
import useCommunityData from '@/hooks/useCommunityData'
import useListCommunitiesData from '@/hooks/useListCommunitiesData'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import useListAllCommunitiesData from '@/hooks/useListAllCommunitiesData'
import { useUserStore } from '@/store/useUserStore'

function LeftMenu() {
  const { items } = useMenuStore()
  const { data } = useListCommunitiesData()
  const { data: allCommunities } = useListAllCommunitiesData()
  const user = useUserStore((state) => state.user)
  const filteredCommunities = allCommunities?.filter((community) => community.createdBy === user?._id)

  return (
    <div className="sticky bottom-0 left-8 top-28 col-span-3 flex-[3] flex-shrink-0 self-start">
      <HorizontalNav items={items} />
      <div className="px-3">
        {data && data.length > 0 && (
          <>
            <h2>Communities</h2>
            {data?.map((community) => (
              <Button
                as={Link}
                variant="flat"
                fullWidth
                href={`/c/${community}`}
                className="my-1 py-4 text-left font-light"
                key={community}
              >
                <div className="w-full text-left">{community}</div>
              </Button>
            ))}
          </>
        )}

        {filteredCommunities && filteredCommunities.length > 0 && (
          <>
            <h2 className="mt-6">Your Communities</h2>
            {filteredCommunities?.map((community) => (
              <Button
                as={Link}
                variant="flat"
                fullWidth
                href={`/c/${community.name}`}
                className="my-1 py-4 text-left font-light"
                key={community._id}
              >
                <div className="w-full text-left">{community.name}</div>
              </Button>
            ))}
          </>
        )}
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-40 m-auto h-full max-w-7xl">
        <div className="absolute left-[29%] h-[calc(100vh-80px)] border-r border-gray-4/20 " />
      </div>
    </div>
  )
}

export default LeftMenu
