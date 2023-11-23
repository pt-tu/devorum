import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register an account',
  description: 'Create your account right now',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-screen overflow-auto bg-dark-1 p-4">
      <div className="m-auto w-full max-w-xl">{children}</div>
    </section>
  )
}
