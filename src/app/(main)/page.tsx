"use client";
import { AppButton, Divider, TopicItem } from "@/components";
import { Tabs } from "@/components/common/Tab";
import { TabProps } from "@/components/common/Tab/TabButton";
import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { useUserStore } from '@/store/useUserStore'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1];
const tabs: TabProps[] = [
  { icon: <ClockCircleOutlined />, label: "New", isSelected: true },
  {
    icon: <ArrowUpOutlined rotate={45} className="text-[14px]" />,
    label: "Top",
  },
  {
    icon: <FireOutlined />,
    label: "Hot",
  },
  { icon: <CheckCircleOutlined />, label: "Closed" },
];

export default function Page() {
  const time = {
    ask: '2 years, 6 months ago',
    modified: '8 months ago',
    viewed: '26k times',
  }
  const [user, getUserProfile] = useUserStore((state) => [state.user, state.getUserProfile], shallow)

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <main className="grid grid-cols-12 gap-5 relative flex-col items-center justify-between h-full px-10">
          <p className="text-gray-bg">main</p>
        </main>
      </Head>
      <div className="col-span-7 col-start-3 flex flex-col h-full">
        {/* Question */}
        <div className="flex flex-row justify-center mb-2">
          <p className="text-gray-bg font-normal text-3xl flex-1">
            Top Questions
          </p>
          <AppButton title="Post" onClick={() => console.log("Click")} />
        </div>
        <Tabs tabs={tabs} />

        <Divider className="my-5" />
        {sample.map((item, index) => (
          <TopicItem key={index} />
        ))}
      </div>
    </>
  );
}
