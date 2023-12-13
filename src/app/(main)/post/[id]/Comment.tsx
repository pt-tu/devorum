import { Avatar } from '@nextui-org/react'
import React from 'react'

const Comment = () => {
  return (
    <div className="mt-6">
      <div className="flex gap-4">
        <Avatar src="/gray.png" />
        <p>tuan-hda</p>
      </div>
      <p className="font-light">
        afawefj awefklj lweakfjklawejalkwefjlakwejlkawef alkwefklawejjfawkelfj awlkejfa lkwjel
      </p>
    </div>
  )
}

export default Comment
