import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cherry Ramatis',
  description: 'User profile',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
