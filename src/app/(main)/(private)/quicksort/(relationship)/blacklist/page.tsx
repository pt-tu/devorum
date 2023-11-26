'use client'

import useSWR from 'swr'
import { getBlockListService } from '@/services/userService'
import { Spinner } from '@nextui-org/react'
import UserCard from '@/components/relationship/UserCard'

const Blacklist = () => {
  const { data, error, isLoading } = useSWR('/relationship/block', getBlockListService)
  const blockUsers = data?.data?.data.filter((block) => block.effective)

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (error) {
    console.log(error)
  }

  if (error || !blockUsers || blockUsers?.length === 0)
    return <div className="m-auto flex flex-col items-center gap-4">All users that you blocked go here.</div>

  return (
    <div className="auto-grid h-fit w-full gap-4 p-4">
      {blockUsers.map((following) => (
        <UserCard user={following.to} key={following._id} />
      ))}
    </div>
  )
}

export default Blacklist
