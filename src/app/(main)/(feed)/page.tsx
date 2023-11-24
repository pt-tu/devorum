'use client'
import { AppButton, HorizontalNav, PostItem, Divider } from '@/components'
import { Tabs } from '@/components/common/Tab'
import { TabProps } from '@/components/common/Tab/TabButton'
import { usePostStore } from '@/store/usePostStore'
import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons'
import Head from 'next/head'
import React, { useEffect } from 'react'

const tabs: TabProps[] = [
  { icon: <ClockCircleOutlined />, label: 'New', isSelected: true },
  {
    icon: <ArrowUpOutlined rotate={45} className="text-[14px]" />,
    label: 'Top',
  },
  {
    icon: <FireOutlined />,
    label: 'Hot',
  },
  { icon: <CheckCircleOutlined />, label: 'Closed' },
]

export default function Page() {
  const { posts } = usePostStore()

  return (
    <div className="col-span-7 col-start-3 ">
      <title>Devorum</title>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <main className="relative grid h-full grid-cols-12 flex-col items-center justify-between gap-5 px-10">
          <p className="text-gray-bg">main</p>
        </main>
      </Head>
      <div className="flex h-full flex-col">
        {/* Question */}
        <div className="mb-2 flex flex-row justify-center">
          <p className="flex-1 text-3xl font-normal text-gray-bg">Top Questions</p>
          <AppButton title="Post" onClick={() => console.log('Click')} />
        </div>
        <Tabs tabs={tabs} />

        <Divider className="my-5" />
        {posts.map((item) => (
          <PostItem {...item} key={item.postId} />
        ))}
      </div>
    </div>
  )
}
