'use client'
import useCommunityData from '@/hooks/useCommunityData'
import { Community } from '@/types/community.type'
import { Button, Checkbox, Divider, Input, Radio, RadioGroup, Spinner, Textarea } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

const ConfigureCommunity = ({ params }: { params: Params }) => {
  const community = params.community
  const { isLoading, data } = useCommunityData(community)
  const [communityData, setCommunityData] = useState<Community>()

  useEffect(() => {
    setCommunityData(data)
  }, [data])

  if (isLoading || !data || !communityData)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const onChangeHandler = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityData(
      (prev) =>
        ({
          ...prev,
          [name]: e.target.value,
        }) as Community,
    )
  }

  return (
    <>
      <title>Configure community</title>
      <div className="col-span-9">
        <div className="w-full space-y-6 rounded-xl bg-dark-2 px-8 py-7">
          <h1 className="text-2xl font-medium">Configure `{data.name}` container</h1>
          <Divider />

          <div>
            <Input
              value={communityData.name}
              isDisabled
              size="lg"
              type="text"
              placeholder="Community name cannot be changed."
              label={<p className="text-base">Community Name</p>}
              labelPlacement="outside"
            />
            <p className="mt-2 text-sm font-light text-gray-6/60">You cannot change community name.</p>
          </div>

          <Divider />

          <div>
            <Textarea
              value={communityData.description}
              onChange={onChangeHandler('description')}
              size="lg"
              type="text"
              label={
                <p className="text-base">
                  Description
                  <span className="ml-4 text-sm font-light text-gray-6/60">
                    {500 - (communityData.description?.length || 0)} characters remaining
                  </span>
                </p>
              }
              labelPlacement="outside"
            />
            <p className="mt-2 text-sm font-light text-gray-6/60">
              A clear description is like a clear documentation. Maybe your members will not read but it is clear. ;*
            </p>
          </div>

          <div>
            <p className="font-medium">Community Visibility</p>
            <RadioGroup onChange={onChangeHandler('visibility')} value={communityData.visibility} className="mt-2">
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </RadioGroup>
          </div>

          <div>
            <p className="font-medium">Other</p>
            <Checkbox
              className="mt-0"
              checked={communityData.scrutinizeToPost}
              onChange={(e) =>
                setCommunityData((prev) => ({ ...prev, scrutinizeToPost: e.target.checked }) as Community)
              }
            >
              Scrutinize content before posting
            </Checkbox>
          </div>
        </div>
        <Button size="lg" color="primary" className="mt-6">
          Save Changes
        </Button>
      </div>
    </>
  )
}

export default ConfigureCommunity
