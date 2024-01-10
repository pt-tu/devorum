import { getProfileService } from '@/services/userService'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import { useParams, usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const useUserProfileData = (username: string) => {
  const [isLoading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<User | undefined>()

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
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile, username])

  return { isLoading, userProfile, fetchUserProfile }
}

export default useUserProfileData
