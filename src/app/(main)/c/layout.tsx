import { Metadata } from 'next'
import { Suspense } from 'react'

type MetadataProps = {
  params: { username: string }
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  return {
    title: 'Community',
    description: 'Community page',
  }
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto max-w-7xl pl-3">
        <Suspense fallback={<div />}>{children}</Suspense>
      </div>
    </section>
  )
}
