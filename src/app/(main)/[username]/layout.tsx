import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cherry Ramatis',
  description: 'User profile',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-dark-1">
      <div className="m-auto max-w-6xl">{children}</div>
    </section>
  )
}
