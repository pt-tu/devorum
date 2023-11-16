import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not found',
  description: 'Not found any page for this url',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
