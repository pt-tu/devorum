'use client'

import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className='w-screen h-screen flex'>
      <div className='m-auto text-center'>
        <p>404 | This page could not be found.</p>
        <Link onClick={() => router.back()} className='cursor-pointer'>
          Go back
        </Link>
      </div>
    </div>
  )
}

export default NotFound
