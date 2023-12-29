'use client'

import { ReactNode, useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useAuthStore, useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import ForbiddenModal from '@/components/common/ForbiddenModal'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user)
  const logout = useAuthStore((state) => state.logOut)
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user === null || user?.role !== 'admin') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [user])

  if (user === undefined) {
    return null
  }

  const onPrimary = () => {
    logout()
    router.push('/login')
  }

  return (
    <>
      <section className="flex h-screen w-full">
        <title>Admin Panel</title>

        <AdminSidebar>{children}</AdminSidebar>
      </section>

      <ForbiddenModal
        isOpen={isOpen}
        header="Admin Private Section Ahead"
        primary="Login"
        onPrimary={onPrimary}
        onSecondary={() => router.back()}
        secondary="Back"
        body="You need admin privileges to access this section. Please login using admin account."
      />
    </>
  )
}

export default AdminLayout
