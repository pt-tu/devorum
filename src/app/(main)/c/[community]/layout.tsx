import { getCommunityService } from '@/services/communityService'
import { Metadata } from 'next'

type MetadataProps = {
  params: { community: string }
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const community = params.community

  try {
    if (!community) {
      console.log('No community in url')
      return {}
    }

    const response = await getCommunityService(community)
    return {
      title: response.data.name,
      description: response.data.description,
    }
  } catch (err) {
    console.log(err)
    return {}
  }
}

export default function CommunityDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto max-w-7xl pl-3">{children}</div>
    </section>
  )
}
