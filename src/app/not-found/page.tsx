'use client'

import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full">
      <div className="m-auto text-center">
        <p>404 | This page could not be found.</p>
        <Link onClick={() => router.push('/')} className="cursor-pointer">
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
