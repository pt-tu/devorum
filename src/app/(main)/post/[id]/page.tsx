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

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Page() {
  const [voted, setVoted] = useState(1)
  // const time = {
  //   ask: '2 years, 6 months ago',
  //   modified: '8 months ago',
  //   viewed: '26k times',
  // }

  return (
    <>
      <div className="relative m-auto min-h-[calc(100vh-80px)] w-full gap-x-5 bg-dark-5 pt-4">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-8 py-8">
            <title>Why Humor Is the Perfect Benchmark for Generative AI</title>
            <h1 className="text-4xl font-semibold">Why Humor Is the Perfect Benchmark for Generative AI</h1>
            <p className="!mt-4 flex gap-2 font-light">
              <span>#programming</span>
              <span>#web</span>
              <span>#message</span>
            </p>

            {/* Community */}
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

            {/* Post info */}
            <div className="flex items-center gap-4">
              <Avatar src="/gray.png" size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font">tuan-hda</p>-<p className="cursor-pointer text-primary-400">Follow</p>
                </div>
                <div className="flex items-center gap-2 font-light">
                  <p className="">Hoang Dinh Anh Tuan</p>-<p>Sep 8</p>
                </div>
              </div>
            </div>

            <ActionBar />
            {/* Content */}
            <div className="space-y-7 text-lg font-light leading-8">
              <p>
                Practicing is a great way of learning. Not everyone however has a mentor that can guide them through the
                corridors of programming. That’s why today I’ll review some open source hello world React projects and
                give you some advice how these could be improved. I’m sure the authors of these projects are already
                more proficient, and I always really appreciate when someone does their own projects. Also, we have to
                consider these are just test/initial projects, so it’s not like the authors didn’t know that, but it was
                not a requirement for them. So great work, and we can also learn a little bit from it! I’ll be just
                describing things that can be improved in the projects I’ve found. I’m picking some low-hanging fruits,
                so join in if you find anything more! If you like to see the whole code you can use links provided!
              </p>
              <p>
                Practicing is a great way of learning. Not everyone however has a mentor that can guide them through the
                corridors of programming. That’s why today I’ll review some open source hello world React projects and
                give you some advice how these could be improved. I’m sure the authors of these projects are already
                more proficient, and I always really appreciate when someone does their own projects. Also, we have to
                consider these are just test/initial projects, so it’s not like the authors didn’t know that, but it was
                not a requirement for them. So great work, and we can also learn a little bit from it! I’ll be just
                describing things that can be improved in the projects I’ve found. I’m picking some low-hanging fruits,
                so join in if you find anything more! If you like to see the whole code you can use links provided!
              </p>

              <Image
                src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*yph4CoX-W2vwfsiJl5X30g.png"
                alt="content_media"
              />
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
