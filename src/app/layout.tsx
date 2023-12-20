'use client'

import './globals.css'
import { Rubik } from 'next/font/google'
import { Providers } from './providers'
import classnames from 'classnames'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { TbMessageReport } from 'react-icons/tb'

const rubik = Rubik({ subsets: ['latin'], display: 'swap' })

// export const metadata: Metadata = {
//   title: 'Devorum',
//   description: 'Forum for Developer',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, getUserProfile] = useUserStore((state) => [state.user, state.getUserProfile])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  return (
    <html lang="en" suppressHydrationWarning className="bg-dark-1 light">
      <body className={classnames(rubik.className, 'h-screen overflow-y-scroll')}>
        <Providers>
          {/* <SWRConfig value={{ keepPreviousData: true }}> */}
          <ErrorBoundary>{children}</ErrorBoundary>
          {/* </SWRConfig> */}
        </Providers>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <>
          <Button
            onClick={onOpen}
            size="lg"
            radius="full"
            className="fixed bottom-4 left-4 z-[30] opacity-75"
            variant="flat"
          >
            Report <TbMessageReport className="text-xl" />
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Report problem</ModalHeader>
                  <ModalBody>
                    <Textarea size="lg" placeholder="Please include as much information as possible"></Textarea>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      Send report
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </body>
    </html>
  )
}
