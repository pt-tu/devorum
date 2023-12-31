import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'New',
    description: 'Create new post or community',
  }
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto max-w-2xl pl-3">{children}</div>
    </section>
  )
}
