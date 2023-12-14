'use client'
import React, { CSSProperties, useEffect, useRef } from 'react'

type Props = {
  fontSize: string
}

const Shell = ({ fontSize = '13px' }: Props) => {
  return (
    <div className="small-scrollbar h-full overflow-auto rounded-xl bg-black p-1">
      <iframe src="http://localhost:2222/ssh/host/127.0.0.1" className="h-full w-full"></iframe>
    </div>
  )
}

export default Shell
