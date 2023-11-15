'use client'
import { AppButton, PostItem } from '@/components'
import { useUserStore } from '@/store/useUserStore'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1]

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
        <main className="relative grid h-full grid-cols-12 flex-col items-center justify-between gap-5 px-10">
          <p className="text-gray-bg">main</p>
        </main>
      </Head>
      <div className="col-span-7 col-start-3 flex flex-col">
        {/* Question */}
        <div className="mb-2 flex flex-1 flex-row justify-center">
          <p className="flex-1 text-2xl font-normal text-gray-bg">Can tailwind colors be referenced from CSS?</p>
          <AppButton title="Post" onClick={() => console.log('Click')} />
        </div>

        {/* Sub info */}
        <div className="flex flex-row gap-4">
          <p className="text-xs text-gray-500">
            Ask <span className="text-gray-bg">{time.ask}</span>
          </p>
          <p className="text-xs text-gray-500">
            Modified <span className="text-gray-bg">{time.modified}</span>
          </p>
          <p className="text-xs text-gray-500">
            Viewed <span className="text-gray-bg">{time.viewed}</span>
          </p>
        </div>
        <div className="my-4 border-t-[0.75px] border-gray-300" />
        {sample.map((item, index) => (
          <PostItem key={index} />
        ))}
      </div>
    </>
  )
}
