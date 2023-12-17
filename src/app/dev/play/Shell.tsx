'use client'
import configs from '@/configs/configs'
import React, { CSSProperties, useEffect, useRef } from 'react'

type Props = {
  fontSize: number | string
}

const Shell = ({ fontSize = '13px' }: Props) => {
  console.log(process.env.NEXT_SHELL_HOSTNAME)
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  return (
    <div className="small-scrollbar h-full overflow-auto rounded-xl bg-black p-1">
      <iframe src={`http://localhost:2222/ssh/host/${configs.SHELL_HOSTNAME}`} className="h-full w-full"></iframe>
    </div>
  )
}

export default Shell
