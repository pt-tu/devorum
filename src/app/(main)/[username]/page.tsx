'use client'
import ContentSection from '@/components/userProfile/ContentSection'
import OverviewBar from '@/components/userProfile/OverviewBar'
import ProfileHeader from '@/components/userProfile/ProfileHeader'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProfileService } from '@/services/userService'
import { isAxiosError } from 'axios'
import { Spinner } from '@nextui-org/react'
import { User } from '@/types/user.type'

export default function UserProfile() {
  const [barHeight, setBarHeight] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<User | undefined>()
  const { username } = useParams()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        if (!username) {
          return console.log('No username in url')
        }

        if (typeof username !== 'string') {
          return console.log('Invalid type of username')
        }

        const response = await getProfileService(username)
        setUserProfile(response.data)
      } catch (err) {
        console.log(err)
        if (isAxiosError(err)) {
          if (err.response?.status === 404) {
            router.push('/not-found')
          }
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [router, username])

  if (loading || !userProfile)
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <div>
      <div className="absolute left-0 right-0 top-20 h-32 w-full bg-[#333]" />
      <div className="relative z-[1]">
        <ProfileHeader userProfile={userProfile} />
        <div className="h-4" />
        <OverviewBar setBarHeight={setBarHeight} />
        <ContentSection barHeight={barHeight} />
      </div>
    </div>
  )
}
