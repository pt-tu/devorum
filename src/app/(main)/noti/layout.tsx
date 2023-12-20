import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Notifications show here',
}

export default function NotiLayout({ children }: { children: React.ReactNode }) {
  return <div className="m-auto mt-4 grid max-w-xl">{children}</div>
}
