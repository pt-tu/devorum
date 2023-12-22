'use client'
import { Card, CardBody, Divider, Spinner, Tab, Tabs } from '@nextui-org/react'
import Notification from './Notification'
import { Fragment, useCallback, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useFixMissingScroll from '@/hooks/useFixMissingScroll'
import IconMap from '@/configs/iconMap'

const Noti = () => {
  const [notifications, setNotifications] = useState<number[]>([1, 2])
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  const fetchData = useCallback(async () => {
    console.log('triggered fetchdata')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setNotifications((prev) => [...prev, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  }, [])

  useFixMissingScroll({
    hasMoreItems: true,
    fetchMoreItems: fetchData,
    element: element,
  })

  return (
    <div className="rounded-xl bg-dark-2 p-6" ref={(node) => setElement(node)}>
      <h1 className="text-2xl font-medium">Notifications</h1>
      <Tabs variant="light" size="lg" className="mt-6" aria-label="Options">
        <Tab key="all" title="All">
          <div className="-mx-6">
            <InfiniteScroll
              dataLength={notifications.length} //This is important field to render the next data
              next={fetchData}
              hasMore={true}
              loader={<Spinner className="w-full" />}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // // below props only if you need pull down functionality
            >
              {notifications.map((n, i) => (
                <Fragment key={i}>
                  <Notification isRead={i % 2 === 0} key={i} type={Object.keys(IconMap)[i % 5]} />
                  {i !== notifications.length - 1 && <Divider />}
                </Fragment>
              ))}
            </InfiniteScroll>
          </div>
        </Tab>
        <Tab key="unread" title="Unread">
          <div className="-mx-6">
            <Notification type="comment" />
            <Divider />
            <Notification type="community" />
            <Divider />
            <Notification type="post" />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Noti
