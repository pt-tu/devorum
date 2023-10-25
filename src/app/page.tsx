import { Providers } from './providers'
import Head from 'next/head'

export default function App() {
  return (
    <Providers>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <main className='bg-dark-2 flex min-h-screen flex-col items-center justify-between p-24'></main>
      </Head>
    </Providers>
  )
}
