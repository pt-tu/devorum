'use client'

import { PostItem } from '@/components'
import useBookmarksData from '@/hooks/useBookmarksData'
import React from 'react'

const BookmarksPage = () => {
  const { data, mutate } = useBookmarksData()

  return (
    <div>
      <h1 className="mt-8 text-4xl font-semibold">Bookmarks</h1>
      {data?.map((post) => <PostItem key={post._id} mutate={mutate} {...post} />)}
    </div>
  )
}

export default BookmarksPage
