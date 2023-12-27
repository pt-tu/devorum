'use client'
import { Divider, Spinner, Tab, Tabs } from '@nextui-org/react'
import Notification from './Notification'
import { Fragment, useCallback, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useFixMissingScroll from '@/hooks/useFixMissingScroll'
import EmptyStateWrapper from './EmptyStateWrapper'
import { useNotificationStore } from '@/store/useNotificationStore'
import useInfiniteScrollData from '@/hooks/useInfiniteScrollData'
import { Notification as NotificationType } from '@/types/notification.type'

const Noti = () => {
  // Must use 2 different states to prevent infinite loop. The createWithEqualityFn of zustand is not working correctly
  const notifications = useNotificationStore((state) => state.notifications)
  const loading = useNotificationStore((state) => state.loading)
  const unreadNotifications = useMemo(() => {
    return notifications.filter((noti) => !noti.isRead)
  }, [notifications])

  const {
    limitData: limitNotifications,
    hasMore: hasMoreNotifications,
    releaseData: releaseNotifications,
  } = useInfiniteScrollData<NotificationType>(notifications)
  const {
    limitData: limitUnreadNotifications,
    hasMore: hasMoreUnreadNotifications,
    releaseData: releaseUnreadNotifications,
  } = useInfiniteScrollData<NotificationType>(unreadNotifications)

  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useFixMissingScroll({
    hasMoreItems: hasMoreNotifications,
    fetchMoreItems: releaseNotifications,
    element: element,
  })

  useFixMissingScroll({
    hasMoreItems: hasMoreUnreadNotifications,
    fetchMoreItems: releaseUnreadNotifications,
    element: element,
  })

  return (
    <div className="rounded-xl bg-dark-2 p-6" ref={(node) => setElement(node)}>
      <h1 className="text-2xl font-medium">Notifications</h1>
      <Tabs variant="light" size="lg" className="mt-6" aria-label="Options">
        <Tab key="all" title="All">
          <EmptyStateWrapper isLoading={loading} isEmpty={notifications.length === 0}>
            <div className="-mx-6">
              <InfiniteScroll
                dataLength={limitNotifications.length} //This is important field to render the next data
                next={releaseNotifications}
                hasMore={limitNotifications.length < notifications.length}
                loader={<Spinner className="w-full" />}
                endMessage={
                  <p className="mt-4" style={{ textAlign: 'center' }}>
                    Yay! There&apos;s no more notifications
                  </p>
                }
              >
                {notifications.map((noti, i) => (
                  <Fragment key={i}>
                    <Notification data={noti} />
                    {i !== notifications.length - 1 && <Divider />}
                  </Fragment>
                ))}
              </InfiniteScroll>
            </div>
          </EmptyStateWrapper>
        </Tab>
        <Tab key="unread" title="Unread">
          <EmptyStateWrapper isEmpty={notifications.length === 0}>
            <div className="-mx-6">
              <InfiniteScroll
                dataLength={limitUnreadNotifications.length} //This is important field to render the next data
                next={releaseUnreadNotifications}
                hasMore={hasMoreUnreadNotifications}
                loader={<Spinner className="w-full" />}
                endMessage={
                  <p className="mt-4" style={{ textAlign: 'center' }}>
                    Yay! There&apos;s no more notifications
                  </p>
                }
              >
                {limitUnreadNotifications.map((noti, i) => (
                  <Fragment key={i}>
                    <Notification data={noti} />
                    {i !== notifications.length - 1 && <Divider />}
                  </Fragment>
                ))}
              </InfiniteScroll>
            </div>
          </EmptyStateWrapper>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Noti
