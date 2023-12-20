'use client'
import { PostItem } from '@/components'
import { useUserStore } from '@/store/useUserStore'
import { Post } from '@/types/post.type'
import { User } from '@/types/user.type'
import React from 'react'

const initPost = (user: User) => {
  return {
    _id: '-1',
    title: '',
    isEditing: true,
    user,
  } as Post
}

const NewPage = () => {
  const { user } = useUserStore()
  if (!user) return
  return (
    <div className="mt-20">
      <PostItem {...initPost(user)} />
    </div>
  )
}

export default NewPage
