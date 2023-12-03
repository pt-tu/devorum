'use client'
import { useParams } from 'next/navigation'

const Community = () => {
  const { community } = useParams()

  return <div>{community}</div>
}

export default Community
