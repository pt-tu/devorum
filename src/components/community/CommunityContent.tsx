import { usePostStore } from '@/store/usePostStore'
import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { PostItem } from '..'

const CommunityContent = () => {
  const posts = usePostStore((state) => state.posts)

  return (
    <div className="col-span-9 mt-4">
      <Tabs aria-label="Options" size="lg">
        <Tab key="Hot" title="Hot">
          {posts.slice(0, 10).map((item) => (
            <PostItem {...item} key={item.postId} />
          ))}
        </Tab>
        <Tab key="New" title="New">
          {posts.slice(1, 3).map((item) => (
            <PostItem {...item} key={item.postId} />
          ))}
        </Tab>
      </Tabs>
    </div>
  )
}

export default CommunityContent
