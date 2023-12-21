'use client'
import { Card, CardBody, Divider, Tab, Tabs } from '@nextui-org/react'
import Notification from './Notification'

const Noti = () => {
  return (
    <div className="rounded-xl bg-dark-2 p-6">
      <h1 className="text-2xl font-medium">Notifications</h1>
      <Tabs variant="light" size="lg" className="mt-6" aria-label="Options">
        <Tab key="all" title="All">
          <div className="-mx-6">
            <Notification isRead type="comment" />
            <Divider />
            <Notification type="community" />
            <Divider />
            <Notification type="post" />
            <Divider />

            <Notification isRead type="general" />
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
