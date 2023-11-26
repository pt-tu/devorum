import { Tab, Tabs } from '@nextui-org/react'
import { PostItem } from '..'
import { usePostStore } from '@/store/usePostStore'

type Props = {
  barHeight: number
}

const ContentSection = ({ barHeight }: Props) => {
  const { posts } = usePostStore()
  if (!barHeight) return null

  return (
    <div
      className="grid grid-cols-12 gap-8"
      style={{
        marginTop: -barHeight,
      }}
    >
      <div className="col-span-4" />
      <div className="col-span-8 rounded-lg">
        <Tabs aria-label="Options" size="lg">
          <Tab key="overview" title="Overview">
            {posts.slice(0, 2).map((item) => (
              <PostItem {...item} key={item.postId} />
            ))}
          </Tab>
          <Tab key="posts" title="Posts">
            {posts.slice(1, 3).map((item) => (
              <PostItem {...item} key={item.postId} />
            ))}
          </Tab>
          <Tab key="comments" title="Comments">
            {posts.slice(0, 3).map((item) => (
              <PostItem {...item} key={item.postId} />
            ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ContentSection
