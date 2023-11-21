import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Edit your profile',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
