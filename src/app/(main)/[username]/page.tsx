'use client'
import ContentSection from '@/components/userProfile/ContentSection'
import OverviewBar from '@/components/userProfile/OverviewBar'
import ProfileHeader from '@/components/userProfile/ProfileHeader'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProfileService } from '@/services/userService'
import { isAxiosError } from 'axios'

const UserProfile = () => {
  const [barHeight, setBarHeight] = useState(0)
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
      } catch (err) {
        console.log(err)
        if (isAxiosError(err)) {
          if (err.response?.status === 404) {
            router.push('/not-found')
          }
        }
      }
    })()
  }, [router, username])

  return (
    <div>
      <div className="absolute left-0 right-0 top-20 h-32 w-full bg-[#333]" />
      <div className="relative z-[1]">
        <ProfileHeader />
        <div className="h-4" />
        <OverviewBar setBarHeight={setBarHeight} />
        <ContentSection barHeight={barHeight} />
      </div>
    </div>
  )
}

export default UserProfile
