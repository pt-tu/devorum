'use client'
import ForbiddenModal from '@/components/common/ForbiddenModal'
import Sidebar from '@/components/common/Sidebar'
import PrivateLayout from '@/components/layouts/PrivateLayout'
import useCommunityData from '@/hooks/useCommunityData'
import { useUserStore } from '@/store/useUserStore'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ConfigureCommunityLayout({ children }: { children: React.ReactNode }) {
  const { community } = useParams()
  const { data } = useCommunityData(community as string)
  const user = useUserStore((state) => state.user)
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (data && user) {
      if (data?.createdBy !== user?._id && !data?.moderators.find((mod) => mod._id === user?._id)) {
        setOpen(true)
      }
    }
  }, [user, data])

  const list = [
    { name: 'Overview', path: `/c/${community}/configure` },
    { name: 'Theme', path: `/c/${community}/configure/theme` },
    { name: 'User titles', path: `/c/${community}/configure/titles` },
    { name: 'Rules & Resources', path: `/c/${community}/configure/rules-resources` },
    { name: 'Moderators', path: `/c/${community}/configure/mods` },
    { name: 'Members', path: `/c/${community}/configure/members` },
    { name: 'Queues', path: `/c/${community}/configure/queues` },
  ]

  return (
    <PrivateLayout>
      <section>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Sidebar list={list} />
          </div>
          {children}
        </div>
      </section>
      <ForbiddenModal
        body="You need permissions to access this section."
        header="Forbidden"
        isOpen={isOpen}
        onPrimary={() => router.back}
        primary="Back"
      />
    </PrivateLayout>
  )
}
