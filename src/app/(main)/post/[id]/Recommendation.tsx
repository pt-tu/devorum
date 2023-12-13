import { Button, Card, CardBody } from '@nextui-org/react'
import React from 'react'

type Props = {
  title: string
  viewMoreTitle: string
}

const Recommendation = ({ title, viewMoreTitle }: Props) => {
  return (
    <div className="!mt-6 grid grid-cols-1 gap-6">
      <p className="col-span-full">{title}</p>

      <Button className="bg-dark-5 px-6 py-10 text-left" fullWidth radius="lg">
        <p className="font w-full text-left text-lg">This is a new post paperwork hello world</p>
      </Button>

      <Button className="bg-dark-5 px-6 py-10 text-left" fullWidth radius="lg">
        <p className="font w-full text-left text-lg">This is a new post paperwork hello world</p>
      </Button>

      <Button className="bg-dark-5 px-6 py-10 text-left" fullWidth radius="lg">
        <p className="font w-full text-left text-lg">This is a new post paperwork hello world</p>
      </Button>

      <Button className="bg-dark-5 px-6 py-10 text-left" fullWidth radius="lg">
        <p className="font w-full text-left text-lg">This is a new post paperwork hello world</p>
      </Button>

      <Button className="col-span-full" fullWidth variant="bordered" size="lg">
        {viewMoreTitle}
      </Button>
    </div>
  )
}

export default Recommendation
