import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Call',
    description: 'Call your friend',
  }
}

export default function CallLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto flex h-screen items-center justify-center pl-3">{children}</div>
    </section>
  )
}
