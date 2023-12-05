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
      title: 'Theming ' + response.data.name + ' Community',
      description: response.data.description,
    }
  } catch (err) {
    console.log(err)
    return {}
  }
}

export default function ConfigureThemeLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
