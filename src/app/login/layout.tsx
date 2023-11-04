import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login to devorum',
  description: 'Login to devorum to participate in largest dev community',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-screen h-screen flex bg-yellow-1 overflow-auto p-4'>
      <div className='w-full max-w-xl m-auto'>{children}</div>
    </section>
  )
  // return (
  //   <section className='w-screen h-screen flex bg-yellow-1 overflow-auto p-4'>
  //     <div className='w-full max-w-xl m-auto'>{children}</div>
  //   </section>
  // )
}
