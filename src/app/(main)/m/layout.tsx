'use client'

import PrivateLayout from '@/components/layouts/PrivateLayout'
import MessageChannelsBar from './MessageChannelsBar'

export default function MessageLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateLayout>
      <section className="fixed bottom-0 left-0 right-0 top-20">
        <title>Message Room</title>
        <div className="m-auto grid h-[calc(100vh-80px)] grid-cols-12">
          <MessageChannelsBar />
          {children}
        </div>
      </section>
    </PrivateLayout>
  )
}
