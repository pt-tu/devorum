'use client'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  if (user === undefined) {
    return null
  }

  if (user) {
    router.push('/')
  }

  return <>{children}</>
}

export default AuthLayout
