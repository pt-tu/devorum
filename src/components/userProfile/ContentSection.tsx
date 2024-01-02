import { Tab, Tabs } from '@nextui-org/react'
import { PostItem } from '..'
import { usePostStore } from '@/store/usePostStore'
import usePostsData from '@/hooks/usePostsData'
import useListSelfPostsData from '@/hooks/useListSelfPostsData'
import { Fragment } from 'react'
import { useParams } from 'next/navigation'

type Props = {}

const ContentSection = ({}: Props) => {
  // const { data } = usePostsData(1, 10)
  const { username } = useParams()
  const { data, mutate } = useListSelfPostsData(username as string)

  if (!data) return null

  return (
    <div className="col-span-8 gap-8 pl-6">
      <div className="col-span-4" />
      <div className="col-span-8 rounded-lg">
        {data.posts.map((item, idx) => (
          <Fragment key={item._id}>
            <PostItem mutate={mutate} {...item} key={item._id} />
            {idx !== data.posts.length - 1 && <div className="mb-10 border-t border-t-gray-4/20" />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default ContentSection
