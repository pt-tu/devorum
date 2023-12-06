import { getProfileService } from '@/services/userService'
import { Metadata } from 'next'

type MetadataProps = {
  params: { username: string }
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const username = params.username

  try {
    if (!username) {
      console.log('No username in url')
      return {}
    }

    const response = await getProfileService(username)
    return {
      title: response.data.fullName || response.data.username,
      description: 'User profile page',
    }
  } catch (err) {
    console.log(err)
    return {}
  }
}
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto max-w-6xl">{children}</div>
    </section>
  )
}