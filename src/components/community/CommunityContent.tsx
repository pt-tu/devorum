import { usePostStore } from '@/store/usePostStore'
import { Tab, Tabs } from '@nextui-org/react'
import React, { Fragment } from 'react'
import { PostItem } from '..'
import { useParams } from 'next/navigation'
import useRecommendedPostsData from '@/hooks/useRecommendedPostsData'

const CommunityContent = () => {
  const { community } = useParams()
  const { data } = useRecommendedPostsData(community as string)

  return (
    <div className="col-span-9 mt-4 pl-16">
      {data?.posts.map((item, idx) => (
        <Fragment key={item._id}>
          <PostItem {...item} key={item._id} />
          {idx !== data.posts.length - 1 && <div className="mb-10 border-t border-t-gray-4/20" />}
        </Fragment>
      ))}
    </div>
  )
}

export default CommunityContent
