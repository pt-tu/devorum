'use client'
import ContentSection from '@/components/userProfile/ContentSection'
import OverviewBar from '@/components/userProfile/OverviewBar'
import ProfileHeader from '@/components/userProfile/ProfileHeader'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProfileService } from '@/services/userService'
import { isAxiosError } from 'axios'
import { Button, Spinner } from '@nextui-org/react'
import { User } from '@/types/user.type'
import Link from 'next/link'

type Props = {
  searchParams: {
    consent?: string
  }
}

export default function UserProfile({ searchParams }: Props) {
  const [barHeight, setBarHeight] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<User | undefined>()
  const { username } = useParams()
  const router = useRouter()

  const fetchUserProfile = useCallback(async () => {
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
  }, [router, username])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile, router, username])

  if (loading || !userProfile)
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Spinner />
      </div>
    )

  if (userProfile.blockStatus?.effective && searchParams.consent !== 'true') {
    return (
      <div className="flex h-[calc(100vh-160px)] w-full">
        <div className="m-auto flex flex-col items-center space-y-3">
          <h1 className="text-2xl font-medium">/{userProfile.username} is blocked</h1>
          <p className="opacity-70">Are you sure you want to continue to their profile?</p>
            <Button as={Link} href={'?consent=true'} variant="flat">
              Yes, Continue
            </Button>
            <Button onClick={() => router.back()} color="primary">
              No, Go back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="absolute left-0 right-0 top-20 h-32 w-full bg-[#333]" />
      <div className="relative z-[1]">
        <ProfileHeader userProfile={userProfile} />
        <div className="h-4" />
        <OverviewBar fetchUserProfile={fetchUserProfile} userProfile={userProfile} setBarHeight={setBarHeight} />
        <ContentSection barHeight={barHeight} />
      </div>
    </>
  )
}
