'use client'
import useCommunityData from '@/hooks/useCommunityData'
import {
  deleteInvitationService,
  joinCommunityService,
  leaveCommunityService,
  selfUpdateCommunityStatusService,
} from '@/services/communityService'
import { useUserStore } from '@/store/useUserStore'
import { Community } from '@/types/community.type'
import copyCurrentLink from '@/utils/copyCurrentLink'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosNotifications, IoIosNotificationsOff } from 'react-icons/io'
import { toast } from 'react-toastify'

type Props = {
  community: string
  data: Community
  isTheming?: boolean
}

const CommunityHeader = ({ community, isTheming }: Props) => {
  const { data, mutate } = useCommunityData(community)
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  const joinHandler = async () => {
    try {
      if (!user) {
        router.push('/register')
        return
      }

      if (data?.joinedStatus) {
        await leaveCommunityService(community)
      } else {
        await Promise.all([joinCommunityService(community), deleteInvitationService(community, user.username)])
      }
      mutate()
    } catch (error) {
      console.log('joinCommunityService error', error)
    }
  }

  const toggleMute = async () => {
    try {
      await selfUpdateCommunityStatusService(community, {
        mute: !data?.joinedStatus?.mute,
      })
      toast.info(`${data?.joinedStatus?.mute ? 'Unmute' : 'Mute'} ${community} community`)
      mutate()
    } catch (error) {
      console.log('toggleMute community error', error)
    }
  }

  if (!data) {
    return null
  }

  return (
    <>
      {!isTheming && <div className="h-4"></div>}
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
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="flex items-end justify-between">
        <h1 className="ml-28 mt-4 text-3xl font-semibold">{community}</h1>

        {!isTheming && (
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
                    <DropdownItem key="conf" as={Link} href={`/c/${community}/configure`}>
                      Configure
                    </DropdownItem>
                    {data.createdBy === user?._id ? (
                      <DropdownItem key="leave">Leave community</DropdownItem>
                    ) : (
                      (null as any)
                    )}
                  </DropdownMenu>
                </Dropdown>

                <Button isIconOnly onClick={toggleMute} variant="bordered">
                  {data.joinedStatus?.mute ? (
                    <IoIosNotificationsOff className="text-xl" />
                  ) : (
                    <IoIosNotifications className="text-xl" />
                  )}
                </Button>
              </>
            )}

            {data.createdBy === user?._id ? (
              <Button color="primary" as={Link} href={`${community}/configure`}>
                <p className="text-base">Configure Community</p>
              </Button>
            ) : (
              <Button
                onClick={joinHandler}
                color={data.joinedStatus ? 'default' : 'primary'}
                variant={data.joinedStatus ? 'flat' : 'solid'}
              >
                <p className="text-base">{data.joinedStatus ? 'Joined' : 'Join'}</p>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default CommunityHeader
