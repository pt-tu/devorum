import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Edit',
    description: 'Edit post',
  }
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto max-w-2xl pl-3">{children}</div>
    </section>
  )
}
