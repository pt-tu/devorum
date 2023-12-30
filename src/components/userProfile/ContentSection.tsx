import { Tab, Tabs } from '@nextui-org/react'
import { PostItem } from '..'
import { usePostStore } from '@/store/usePostStore'

type Props = {}

const ContentSection = ({}: Props) => {
  const { posts } = usePostStore()

  return (
    <div className="col-span-8 gap-8">
      <div className="col-span-4" />
      <div className="col-span-8 rounded-lg">
        <Tabs variant="underlined" aria-label="Options" size="lg">
          <Tab key="overview" title="Overview">
            {/* {posts.slice(0, 2).map((item) => (
              <PostItem {...item} key={item.postId} />
            ))} */}
          </Tab>
          <Tab key="posts" title="Posts">
            {/* {posts.slice(1, 3).map((item) => (
              <PostItem {...item} key={item.postId} />
            ))} */}
          </Tab>
          <Tab key="comments" title="Comments">
            {/* {posts.slice(0, 3).map((item) => (
              <PostItem {...item} key={item.postId} />
            ))} */}
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ContentSection
