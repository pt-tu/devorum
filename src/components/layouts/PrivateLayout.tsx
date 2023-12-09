'use client'

import { useUserStore } from '@/store/useUserStore'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ForbiddenModal from '../common/ForbiddenModal'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user)
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      setOpen(true)
    }
  }, [user])

  if (user === undefined) {
    return null
  }

  return (
    <>
      {children}
      <ForbiddenModal
        isOpen={isOpen}
        header="Private Section Ahead"
        primary="Register"
        onPrimary={() => router.push('/register')}
        onSecondary={() => router.back()}
        secondary="Back"
        body="You need permissions to access this section. Please login or register to continue."
      />
      {/* {!user && <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-white/30 backdrop-blur-md"></div>}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Private Section Ahead</ModalHeader>
              <ModalBody>
                <p>You need permissions to access this section. Please login or register to continue.</p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => router.back()} color="danger" variant="light" onPress={onClose}>
                  Go back
                </Button>
                <Button onClick={() => router.push('/register')} color="primary" onPress={onClose}>
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  )
}
