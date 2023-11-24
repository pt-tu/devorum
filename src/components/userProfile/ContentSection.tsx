import { Tab, Tabs } from '@nextui-org/react'
import { PostItem } from '..'
import { usePostStore } from '@/store/usePostStore'

type Props = {
  barHeight: number
}

const ContentSection = ({ barHeight }: Props) => {
  if (!barHeight) return null
  const { posts } = usePostStore()

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
            {posts.slice(0, 2).map((item, index) => (
              <PostItem {...item} key={index} />
            ))}
          </Tab>
          <Tab key="posts" title="Posts">
            {posts.slice(1, 3).map((item, index) => (
              <PostItem {...item} key={index} />
            ))}
          </Tab>
          <Tab key="comments" title="Comments">
            {posts.slice(0, 3).map((item, index) => (
              <PostItem {...item} key={index} />
            ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ContentSection
