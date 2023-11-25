'use client'

import Sidebar from '@/components/common/Sidebar'
import { getOverviewQuicksortService } from '@/services/userService'
import { Card, CardBody, Divider, Spinner } from '@nextui-org/react'
import { FaSortAlphaDown } from 'react-icons/fa'
import useSWR from 'swr'

const stuffs = [
  {
    name: 'Posts',
    path: '/quicksort',
  },
  {
    name: 'Followers',
    path: '/quicksort/followers',
  },
  {
    name: 'Followings',
    path: '/quicksort/followings',
  },
  {
    name: 'Following Tags',
    path: '/quicksort/following-tags',
  },
  {
    name: 'Analytic',
    path: '/quicksort/analytic',
  },
  {
    name: 'Blacklist',
    path: '/quicksort/blacklist',
  },
  {
    name: 'Hidden Tags',
    path: '/quicksort/hidden-tags',
  },
]

const QuicksortLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: overviewData, error, isLoading } = useSWR('/quicksort', getOverviewQuicksortService)

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-160px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (error) {
    console.log(error)
  }

  return (
    <section className="m-auto grid max-w-6xl pt-4">
      <title>Quicksort</title>
      <h1 className="my-6 flex items-center gap-4 text-4xl font-medium">
        <FaSortAlphaDown />
        Quicksort Your Stuffs ;)
      </h1>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-3">
          <CardBody className="">
            <div className="flex h-20 flex-col justify-center">
              <p className="text-3xl">30</p>
              <p>Total post votes</p>
            </div>
          </CardBody>
        </Card>

        <Card className="col-span-3">
          <CardBody className="">
            <div className="flex h-20 flex-col justify-center">
              <p className="text-3xl">30</p>
              <p>Total post views</p>
            </div>
          </CardBody>
        </Card>

        <Card className="col-span-3">
          <CardBody className="">
            <div className="flex h-20 flex-col justify-center">
              <p className="text-3xl">30</p>
              <p>Total post comments</p>
            </div>
          </CardBody>
        </Card>
      </div>
      <Divider className="mt-4" />
      <div className="mt-4 grid grid-cols-12 gap-4">
        {overviewData?.data && <Sidebar overviewData={overviewData.data} list={stuffs} />}
        <div className="col-span-9 flex rounded-xl bg-dark-2">{children}</div>
      </div>
    </section>
  )
}

export default QuicksortLayout
