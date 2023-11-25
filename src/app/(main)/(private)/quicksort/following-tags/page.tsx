'use client'

import Image from 'next/image'

const FollowingTags = () => {
  return (
    <div className="m-auto flex flex-col items-center gap-4">
      <Image
        alt="empty_state"
        src="/empty_state.svg"
        className="h-[160px] w-[160px] object-contain"
        width={160}
        height={160}
      />
      404. No tags found.
    </div>
  )
}

export default FollowingTags
