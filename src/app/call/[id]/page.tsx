'use client'

import Call from '../Call'

const CallPage = ({ params, searchParams }: { params: any; searchParams: any }) => {
  const id = params.id
  const avatar = searchParams['avatar']
  return <Call channel={id} avatar={avatar} />
}

export default CallPage
