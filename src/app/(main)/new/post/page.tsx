'use client'
import { PostItem } from '@/components'
import { usePostStore } from '@/store/usePostStore'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewPage = () => {
  const router = useRouter()
  const { user } = useUserStore()
  if (!user) router.push('/login')
  const { selected } = usePostStore()

  return (
    selected && (
      <div className="mt-20">
        <PostItem {...selected} />
      </div>
    )
  )
}

export default NewPage
