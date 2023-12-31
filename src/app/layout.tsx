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
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useThemeStore } from '@/store/useThemeStore'

const rubik = Rubik({ subsets: ['latin'], display: 'swap' })

// export const metadata: Metadata = {
//   title: 'Devorum',
//   description: 'Forum for Developer',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, getUserProfile] = useUserStore((state) => [state.user, state.getUserProfile])
  const [screenCapture, setScreenCapture] = useState('')

  const theme = useThemeStore((state) => state.theme)
  const pathname = usePathname()

  const paths = ['/', '/new/post', '/new/community']

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames('light', paths.includes(pathname) ? 'bg-dark-8' : 'bg-dark-1')}
    >
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
