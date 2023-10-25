import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register an account',
  description: 'Create your account right now',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-screen h-screen flex bg-yellow-1 overflow-auto p-4'>
      <div className='w-full max-w-xl m-auto'>{children}</div>
    </section>
  )
}
