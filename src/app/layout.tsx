'use client'

import './globals.css'
import { Rubik } from 'next/font/google'
import { Providers } from './providers'
import classnames from 'classnames'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import Report from '@/components/report/Report'

const rubik = Rubik({ subsets: ['latin'], display: 'swap' })

// export const metadata: Metadata = {
//   title: 'Devorum',
//   description: 'Forum for Developer',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, getUserProfile] = useUserStore((state) => [state.user, state.getUserProfile])
  const [screenCapture, setScreenCapture] = useState('')

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
        <Report />
      </body>
    </html>
  )
}
