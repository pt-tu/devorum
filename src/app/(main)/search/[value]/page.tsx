'use client'
import useListAllCommunitiesData from '@/hooks/useListAllCommunitiesData'
import useListProfilesData from '@/hooks/useListProfilesData'
import { Avatar, Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const SearchPage = ({ params }: { params: any }) => {
  const value = params.value
  const { data } = useListAllCommunitiesData()
  const { data: profiles } = useListProfilesData()

  const filteredCommunities = data?.filter(
    (community) =>
      community.name.toLowerCase().includes(value.toLowerCase()) ||
      community.description?.toLowerCase().includes(value.toLowerCase()),
  )
  const filteredProfiles = profiles?.filter(
    (profile) =>
      profile.fullName?.toLowerCase().includes(value.toLowerCase()) ||
      profile.username?.toLowerCase().includes(value.toLowerCase()) ||
      profile.email?.toLowerCase().includes(value.toLowerCase()) ||
      profile.about?.toLowerCase().includes(value.toLowerCase()),
  )
  return (
    <>
      <h1 className="text-xl font-medium">Search result for {value}</h1>
      <Tabs aria-label="Options" className="mt-6">
        <Tab key="community" title="Communities">
          {filteredCommunities && filteredCommunities.length > 0 ? (
            filteredCommunities.map((community) => (
              <Card as={Link} href={`/c/${community.name}`} key={community._id} className="mt-4 ">
                <CardBody className="">
                  <div className="flex flex-row items-center gap-6 px-4 py-4">
                    <Avatar src={community.photo || '/gray.png'} />
                    {community.name}
                  </div>
                  {community.description && <p className="p-4 font-light">{community.description}</p>}
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="mt-6">No results found</div>
          )}
        </Tab>
        <Tab key="user" title="Users">
          {filteredProfiles && filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card as={Link} href={`/p/${profile.username}`} key={profile._id} className="mt-4 ">
                <CardBody className="">
                  <div className="flex flex-row items-center gap-6 px-4 py-4">
                    <Avatar src={profile.avatar || '/gray.png'} />
                    {profile.fullName || profile.username}
                  </div>
                  {profile.about && <p className="p-4 font-light">{profile.about}</p>}
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="mt-6">No results found</div>
          )}
        </Tab>
      </Tabs>
    </>
  )
}

export default SearchPage
