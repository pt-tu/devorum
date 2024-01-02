import { PostItem } from '@/components'
import useReadNextData from '@/hooks/useReadNextData copy'
import { useUserStore } from '@/store/useUserStore'
import { Button, Card, CardBody, Divider } from '@nextui-org/react'
import React, { Fragment, useMemo } from 'react'

type Props = {
  title: string
  viewMoreTitle: string
  postId: string
}

const Recommendation = ({ title, viewMoreTitle, postId }: Props) => {
  const { data } = useReadNextData(postId)
  const user = useUserStore((state) => state.user)

  const filteredPosts = useMemo(() => {
    if (!data) return []
    console.log('filtered user:', user)
    if (user) {
      return data.posts.filter(
        (item) => !user.blocks.find((block) => block === item.user.username) && item._id !== postId,
      )
    } else {
      return data.posts
    }
  }, [data, postId, user])

  return (
    <div className="!mt-6 grid grid-cols-1 gap-6">
      <p className="col-span-full text-2xl">Read Next</p>

      {filteredPosts.map((post) => (
        <Fragment key={post._id}>
          <PostItem {...post} />
          <div className="mb-8 border-t border-t-gray-4/20" />
        </Fragment>
      ))}
    </div>
  )
}

export default Recommendation
