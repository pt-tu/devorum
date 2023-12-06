'use client'
import { Button, Input, Textarea } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community

  return (
    <>
      <title>Configure user titles</title>
      <div className="w-full space-y-6 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Adjust moderators for `{community}`</h1>
        <div>
          <Textarea
            size="lg"
            type="text"
            placeholder="Each rule on each line"
            label={<p className="text-base">Rules</p>}
            labelPlacement="outside"
          />
        </div>

        <div>
          <Textarea
            size="lg"
            type="text"
            placeholder="Each resource on each line"
            label={<p className="text-base">Resources</p>}
            labelPlacement="outside"
          />
        </div>
      </div>
      <Button size="lg" color="primary" className="mt-6">
        Save Changes
      </Button>
    </>
  )
}

export default ConfigureTheme
