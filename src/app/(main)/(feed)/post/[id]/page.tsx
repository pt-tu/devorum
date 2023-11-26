'use client'
import { AppButton, CommentItem } from '@/components'
import React from 'react'

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Page() {
  const time = {
    ask: '2 years, 6 months ago',
    modified: '8 months ago',
    viewed: '26k times',
  }

  return (
    <div className="col-span-6 col-start-4">
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
      <div className="my-5 border-t-[0.75px] border-gray-300" />
      {sample.map((item, index) => (
        <CommentItem key={index} />
      ))}
    </div>
  )
}
