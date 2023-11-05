import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { Providers } from './providers'
import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'

const rubik = Rubik({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Devorum',
  description: 'Forum for Developer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning data-theme='light'>
      <body className={classnames(rubik.className, 'h-screen max-h-screen overscroll-none')}>
        <Providers>{children}</Providers>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </body>
    </html>
  )
}
