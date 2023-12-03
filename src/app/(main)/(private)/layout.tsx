'use client'

import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  if (user === undefined) {
    return null
  }

  if (user === null) {
    router.push('/register')
  }

  return <>{children}</>
}
