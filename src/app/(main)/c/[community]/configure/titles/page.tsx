'use client'
import { Checkbox, Divider, Spinner, Tab, Tabs } from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'
import EditTitles from './EditTitles'
import AssignTitles from './AssignTitles'
import useCommunityData from '@/hooks/useCommunityData'
import { updateCommunityService } from '@/services/communityService'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community

  const { isLoading, mutate, data } = useCommunityData(community)

  if (isLoading || !data)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateCommunityService(community, { ...data, allowAligningTitle: e.target.checked })
      mutate()
    } catch (error) {
      console.log('Update check error:', error)
    }
  }

  return (
    <>
      <title>Configure user titles</title>
      <div className="w-full space-y-6 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Configure user titles</h1>
        <Divider />
        <div className="float-right mt-2">
          <div className="h-4" />
          <Checkbox isSelected={data.allowAligningTitle} onChange={onChangeHandler}>
            Allow members to align title
          </Checkbox>
        </div>
        <Tabs aria-label="Options" size="lg">
          <Tab key="Initialize" title="Initialize">
            <EditTitles community={community} />
          </Tab>
          <Tab key="Assign" title="Assign">
            <AssignTitles community={community} />
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default ConfigureTheme
