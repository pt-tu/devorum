'use client'
import useRoomsData from '@/hooks/useCommunityData'
import { updateCommunityService } from '@/services/communityService'
import { Community } from '@/types/community.type'
import { Button, Input, Spinner, Textarea } from '@nextui-org/react'
import _ from 'lodash'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community
  const { isLoading, data, mutate } = useRoomsData(community)
  const [communityData, setCommunityData] = useState<Community>()
  const [updateLoading, setUpdateLoading] = useState(false)

  const isDisabled = useMemo(() => {
    return _.isEqual(communityData, data)
  }, [communityData, data])

  useEffect(() => {
    setCommunityData(data)
  }, [data])

  if (isLoading || !data || !communityData)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const onChangeHandler = (name: 'rules' | 'resources') => (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityData(
      (prev) =>
        ({
          ...prev,
          [name]: e.target.value.split('\n'),
        }) as Community,
    )
  }

  const updateHandler = async () => {
    try {
      setUpdateLoading(true)
      await updateCommunityService(community, communityData)
      mutate()
    } catch (error) {
      console.log('updateHandler', error)
    } finally {
      setUpdateLoading(false)
    }
  }

  const displayText = (value?: string | string[]) => {
    if (!value) return ''

    const arr = typeof value === 'string' ? [value] : value
    return arr.join('\n')
  }

  return (
    <>
      <title>Configure user titles</title>
      <div className="w-full space-y-6 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Set up rules and resources for `{community}`</h1>
        <div>
          <Textarea
            size="lg"
            value={displayText(communityData.rules)}
            onChange={onChangeHandler('rules')}
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
            value={displayText(communityData.resources)}
            onChange={onChangeHandler('resources')}
            placeholder="Each resource on each line, each resource should be in format: [name](url)"
            label={<p className="text-base">Resources</p>}
            labelPlacement="outside"
          />
        </div>
      </div>
      <Button
        isLoading={updateLoading}
        onClick={updateHandler}
        isDisabled={isDisabled}
        size="lg"
        color="primary"
        className="mt-6"
      >
        Save Changes
      </Button>
    </>
  )
}

export default ConfigureTheme
