'use client'

import { Tab, Tabs } from '@nextui-org/react'
import MembersTab from './MembersTab'
import BannedTab from './BannedTab'

const MembersPage = ({ params }: { params: any }) => {
  const community = params.community

  return (
    <>
      <title>Configure user titles</title>

      <div className="w-full space-y-7 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Manage members of this community</h1>
        <Tabs size="lg">
          <Tab key="members" title="Members">
            <MembersTab community={community} />
          </Tab>
          <Tab key="banned" title="Banned">
            <BannedTab community={community} />
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default MembersPage
