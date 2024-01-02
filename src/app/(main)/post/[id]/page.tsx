'use client'
import { AppButton, CommentItem } from '@/components'
import copyCurrentLink from '@/utils/copyCurrentLink'
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Spinner,
} from '@nextui-org/react'
import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi'
import { CiBookmark } from 'react-icons/ci'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoShareOutline } from 'react-icons/io5'
import { IoChatbubbleOutline } from 'react-icons/io5'
import ActionBar from './ActionBar'
import Recommendation from './Recommendation'
import Link from 'next/link'
import CommentSection from './CommentSection'
import usePostDetailData from '@/hooks/usePostDetailData'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // O
import { useThemeStore } from '@/store/useThemeStore'
import moment from 'moment'
import { followUserService, getProfileService, unfollowUserService } from '@/services/userService'
import { User } from '@/types/user.type'
import { isAxiosError } from 'axios'

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Page({ params }: { params: any }) {
  const [voted, setVoted] = useState(1)
  const theme = useThemeStore((state) => state.theme)
  const { data } = usePostDetailData(params.id)
  const [userProfile, setUserProfile] = useState<User | undefined>()

  const unfollow = async () => {
    try {
      if (userProfile) {
        await unfollowUserService(userProfile.username)
        fetchUserProfile()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const follow = async () => {
    try {
      if (userProfile) {
        await followUserService(userProfile.username)
        fetchUserProfile()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollowClick = () => {
    if (userProfile) {
      if (userProfile.followStatus) {
        unfollow()
      } else {
        follow()
      }
    }
  }

  const fetchUserProfile = useCallback(async () => {
    try {
      if (!data) return
      if (!data?.user.username) {
        return console.log('No username in url')
      }

      if (typeof data?.user.username !== 'string') {
        return console.log('Invalid type of username')
      }

      const response = await getProfileService(data.user.username)
      setUserProfile(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [data])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  if (!data)
    return (
      <div className="flex min-h-[calc(100vh-160px)] w-full flex-col items-center justify-center gap-6">
        <Spinner size="lg" />
      </div>
    )

  return (
    <>
      <div className="relative m-auto min-h-[calc(100vh-80px)] w-full gap-x-5 bg-dark-5 pt-4">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-8 py-8">
            <title>{data?.title}</title>
            <h1 className="text-4xl font-semibold">{data?.title}</h1>
            <p className="!mt-4 flex gap-2 font-light">
              {data.tags.map((tag: any) => (
                <span key={tag}>{tag}</span>
              ))}
            </p>

            {/* Community */}
            {data.communityData && (
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <Link href="/c/ghibli" className="text-lg font-medium">
                      community/{data.communityData.name}
                    </Link>
                  </div>
                  {data.communityData.title && <h2 className="font mt-2 text-base">{data.communityData.title}</h2>}
                  {data.communityData.description && (
                    <p className="text-base font-light">{data.communityData.description}</p>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Post info */}
            <div className="flex items-center gap-4">
              <Link href={`/p/${data.user.username}`}>
                <Avatar src={data.user.avatar || '/gray.png'} size="lg" />
              </Link>
              <div>
                <Link href={`/p/${data.user.username}`}>
                  <div className="flex items-center gap-2">
                    <p className="font">{data.user.username}</p>
                  </div>
                </Link>
                <div className="flex items-center gap-2 font-light">
                  <p className="">{data.user.fullName || data.user.username}</p>-
                  <p>{moment(data.createdAt).format('MMM DD')}</p>
                </div>
              </div>
            </div>

            <ActionBar />
            {/* Content */}
            <div className={classNames('space-y-7 text-lg font-light leading-8', theme === 'dark' && 'dark')}>
              <div className="prose dark:prose-dark" dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>

            <div className="h-6" />
            <ActionBar />
            <div className="h-6" />
            <CommentSection />
          </div>
        </div>
      </div>

      {/* Author recommendation */}
      <div className="mx-auto max-w-2xl space-y-16">
        <div className="h-12"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 font-light">
            <p className="text-2xl font-medium">Encoded by {data.user.username}</p>
          </div>
          <div className="flex items-center gap-6">
            <Avatar src="/gray.png" size="lg" className="flex-shrink-0" />
            <p className="two-lines-ellipsis min-w-0 font-light">
              Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello
              world Hello world Hello world Hello world Hello world Hello world Hello world Hello world{' '}
            </p>
          </div>
        </div>

        <Divider />
        <Recommendation title="More from tuan-hda" viewMoreTitle="View more from tuan-hda" />

        <Divider />

        <Recommendation
          title="You might like these (our algorithm says so, hope it's right this time...)"
          viewMoreTitle="View more from our recommendation"
        />
      </div>
    </>
  )
}
