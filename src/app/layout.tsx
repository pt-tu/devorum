'use client'

import './globals.css'
import { Rubik } from 'next/font/google'
import { Providers } from './providers'
import classnames from 'classnames'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'

const rubik = Rubik({ subsets: ['latin'], display: 'swap' })

// export const metadata: Metadata = {
//   title: 'Devorum',
//   description: 'Forum for Developer',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, getUserProfile] = useUserStore((state) => [state.user, state.getUserProfile])

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  return (
    <html lang="en" suppressHydrationWarning className="bg-dark-1 light">
      <body className={classnames(rubik.className, 'h-screen overflow-y-scroll')}>
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  )
}
