import Sidebar from '@/components/common/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Customize your experience',
}

const settingMenus = [
  {
    name: 'Profile',
    path: '/settings/profile',
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto mt-4 grid max-w-6xl grid-cols-12 gap-4">
      <Sidebar list={settingMenus} />
      {children}
    </div>
  )
}
