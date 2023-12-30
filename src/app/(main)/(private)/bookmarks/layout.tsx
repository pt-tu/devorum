import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="m-auto max-w-3xl pl-3">{children}</div>
    </section>
  )
}

export default layout
