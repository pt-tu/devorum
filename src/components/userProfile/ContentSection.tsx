import { Tab, Tabs } from '@nextui-org/react'
import { TopicItem } from '..'

type Props = {
  barHeight: number
}

const ContentSection = ({ barHeight }: Props) => {
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
            {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
              <TopicItem key={index} />
            ))}
          </Tab>
          <Tab key="posts" title="Posts">
            {[1, 1, 1, 1].map((item, index) => (
              <TopicItem key={index} />
            ))}
          </Tab>
          <Tab key="comments" title="Comments">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
              <TopicItem key={index} />
            ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ContentSection
