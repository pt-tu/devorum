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
import { SWRConfig } from 'swr'
import { socket } from '@/configs/socketIO'
import useRoomsData from '@/hooks/useRoomsData'
import checkPageStatus from '@/utils/notifyUser'
import { useMessageStore } from '@/store/useMessagesStore'
import { Message } from '@/types/chat.type'

const rubik = Rubik({ subsets: ['latin'], display: 'swap' })

// export const metadata: Metadata = {
//   title: 'Devorum',
//   description: 'Forum for Developer',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, getUserProfile] = useUserStore((state) => [state.user, state.getUserProfile])
  const appendMessage = useMessageStore((state) => state.appendMessage)
  const { data: rooms, mutate } = useRoomsData()

  useEffect(() => {
    if (rooms && user) {
      socket.emit(
        'joinRooms',
        rooms.map((room) => room._id),
      )
    }
  }, [rooms, user])

  useEffect(() => {
    const handleMessageResponse = (data: { message: Message; type: 'append' | 'update' }) => {
      if (!data?.message?._id) {
        return
      }

      console.log('Received message')
      if (user) checkPageStatus(data.message, user)
      appendMessage(data.message, data.type)
      mutate()
    }

    socket.on('messageResponse', handleMessageResponse)

    return () => {
      socket.off('messageResponse', handleMessageResponse)
    }
  }, [appendMessage, mutate, user])

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
      </body>
    </html>
  )
}
