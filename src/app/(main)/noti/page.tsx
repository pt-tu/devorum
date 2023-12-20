'use client'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import Notification from './Notification'

const Noti = () => {
  return (
    <div className="rounded-xl bg-dark-2 p-6">
      <h1 className="text-2xl font-medium">Notifications</h1>
      <Tabs variant="light" size="lg" className="mt-6" aria-label="Options">
        <Tab key="all" title="All">
          <div className="w-full">
            <Notification />
            <Notification />
            <Notification />
          </div>
        </Tab>
        <Tab key="unread" title="Unread">
          <div>
            <Notification />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Noti
