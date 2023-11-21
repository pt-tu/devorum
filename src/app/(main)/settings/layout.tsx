import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Customize your experience',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
