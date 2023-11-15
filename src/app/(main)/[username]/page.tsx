'use client'
import OverviewBar from '@/components/userProfile/OverviewBar'
import ProfileHeader from '@/components/userProfile/ProfileHeader'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

const page = () => {
  return (
    <div>
      <div className="fixed left-0 top-20 z-0 h-32 w-full bg-[#333]" />
      <ProfileHeader />
      <div className="mt-4 grid grid-cols-12 gap-4">
        <OverviewBar />
        <div className="col-span-8 h-20 rounded-lg">
          <Tabs aria-label="Options" size="lg">
            <Tab key="photos" title="Photos">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Music">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Videos">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default page
