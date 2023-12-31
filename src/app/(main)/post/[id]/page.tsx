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
import React, { useState } from 'react'
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

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Page({ params }: { params: any }) {
  const [voted, setVoted] = useState(1)
  const { data } = usePostDetailData(params.id)
  // const time = {
  //   ask: '2 years, 6 months ago',
  //   modified: '8 months ago',
  //   viewed: '26k times',
  // }

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
            {data.community && (
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <Link href="/c/ghibli" className="text-lg font-medium">
                      community/ghibli
                    </Link>
                    <Button color="primary">Join</Button>
                  </div>
                  {'Hello this is ghibli' && <h2 className="font mt-2 text-base">{'Hello this is ghibli'}</h2>}
                  {'What are you waiting for. Come to explore the wonderful world' && (
                    <p className="text-base font-light">
                      {'What are you waiting for. Come to explore the wonderful world'}
                    </p>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Post info */}
            <div className="flex items-center gap-4">
              <Avatar src={data.user.avatar || '/gray.png'} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font">{data.user.username}</p>-<p className="cursor-pointer text-primary-400">Follow</p>
                </div>
                <div className="flex items-center gap-2 font-light">
                  <p className="">{data.user.fullName || data.user.username}</p>-<p>Sep 8</p>
                </div>
              </div>
            </div>

            <ActionBar />
            {/* Content */}
            <div className="space-y-7 text-lg font-light leading-8">
              <div className="prose" dangerouslySetInnerHTML={{ __html: data.content }}></div>
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
            <p className="text-2xl font-medium">Encoded by tuan-hda</p>
            <Button className="ml-auto" size="lg" color="primary">
              Follow
            </Button>
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
