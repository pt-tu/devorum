'use client'
import { AppButton, HorizontalNav, PostItem, Divider } from '@/components'
import { TabProps } from '@/components/common/Tab/TabButton'
import usePostsData from '@/hooks/usePostsData'
import { usePostStore } from '@/store/usePostStore'
import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons'
import { Tab, Tabs } from '@nextui-org/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const tabs: TabProps[] = [
  {
    key: 'new',
    icon: <ClockCircleOutlined />,
    label: 'New',
  },
  {
    key: 'top',
    icon: <ArrowUpOutlined rotate={45} className="text-[14px]" />,
    label: 'Top',
  },
  {
    key: 'hot',
    icon: <FireOutlined />,
    label: 'Hot',
  },
  { key: 'closed', icon: <CheckCircleOutlined />, label: 'Closed' },
]

export default function Page() {
  const { posts, setPosts } = usePostStore()
  const [selectedTab, setSelectedTab] = useState<string | number>(tabs[0].key)
  const [currentPosts, setCurrentPosts] = useState(posts)

  const { data, isLoading } = usePostsData(1, 10)
  // if (data?.posts) setPosts(data.posts)
  useEffect(() => {
    if (data?.posts) setCurrentPosts(data.posts)
  }, [isLoading])

  const onSelectionChange = (key: string | number) => {
    setSelectedTab(key)
    switch (key) {
      case 'top':
        setCurrentPosts(posts.slice(0, 1))
        break
      case 'hot':
        setCurrentPosts(posts.slice(1.3))
        break
      case 'closed':
        setCurrentPosts(posts.slice(2, 6))
        break
      case 'new':
      default:
        setCurrentPosts(posts)
        break
    }
  }

  useEffect(() => {
    setCurrentPosts(posts)
  }, [posts])

  return (
    <div className="col-span-6 col-start-4">
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
        <Tabs
          aria-label="Options"
          variant="light"
          selectedKey={selectedTab || tabs[0].key}
          onSelectionChange={(key) => onSelectionChange(key)}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              }
            />
          ))}
        </Tabs>

        <Divider className="my-5" />
        {currentPosts.map((item) => (
          <PostItem {...item} key={item._id} />
        ))}
      </div>
    </div>
  )
}
