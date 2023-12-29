'use client'

import useListReportsData from '@/hooks/useListReportsData'
import { updateReportService } from '@/services/reportService'
import { Report } from '@/types/report.type'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
} from '@nextui-org/react'
import classNames from 'classnames'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { CSSProperties, Key, useEffect, useMemo, useState } from 'react'
import { TbFilter, TbFilterBolt } from 'react-icons/tb'

type Props = {}

const BugsPage = (props: Props) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['All']))
  const [selectedState, setSelectedState] = useState(new Set(['Active']))
  const [search, setSearch] = useState('')
  const { data, isLoading, mutate } = useListReportsData()
  const [currentBug, setCurrentBug] = useState<Report>()

  const filteredData = useMemo(() => {
    const lowerCaseSearch = search.toLowerCase()
    let finalData = data?.filter(
      (item) =>
        item.description.toLowerCase().includes(lowerCaseSearch) ||
        item._id.toLowerCase().includes(lowerCaseSearch) ||
        item.createdBy.toLowerCase().includes(lowerCaseSearch) ||
        (item.createdByData.fullName && item.createdByData.fullName.toLowerCase().includes(lowerCaseSearch)),
    )
    if (selectedKeys.values().next().value !== 'All') {
      finalData = finalData?.filter((item) => item.resolved === (selectedKeys.values().next().value === 'Resolved'))
    }

    return finalData || []
  }, [data, selectedKeys, search])

  useEffect(() => {
    setSelectedState(new Set([currentBug?.resolved ? 'Resolved' : 'Active']))
  }, [currentBug])

  const updateStateOfBug = async (resolved: boolean) => {
    try {
      if (!currentBug) return
      await updateReportService(currentBug._id, resolved)
      mutate()
    } catch (error) {
      console.log('error update state of bug:', error)
    }
  }

  const handleSelectionChange = (selection: Key) => {
    const value = (selection as unknown as Set<string>).values().next().value
    setSelectedState(new Set([value]))
    if (value === 'Resolved') {
      updateStateOfBug(true)
    } else {
      updateStateOfBug(false)
    }
  }

  if (isLoading || !data) {
    return (
      <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-6">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100%-80px)] gap-6 overflow-y-auto border-t border-t-gray-4/20">
      <ul className="small-scrollbar sticky top-0 h-full max-w-[400px] flex-1 self-start overflow-y-scroll bg-dark-5">
        <div className="flex items-center gap-2 border-b border-b-gray-4/20 p-6">
          <Input onChange={(e) => setSearch(e.target.value)} value={search} fullWidth placeholder="Search bugs" />
          <Dropdown>
            <Badge
              content=""
              color={selectedKeys.values().next().value === 'Active' ? 'danger' : 'success'}
              className={classNames('-mr-4', selectedKeys.values().next().value === 'All' && 'hidden')}
            >
              <DropdownTrigger>
                <Button className="-mr-4" size="lg" isIconOnly radius="full" variant="light">
                  <TbFilterBolt className="text-xl text-gray-6/70" />
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu
              variant="flat"
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys as any}
            >
              <DropdownSection title="State">
                {['All', 'Active', 'Resolved'].map((state) => (
                  <DropdownItem
                    startContent={
                      <div
                        className={classNames(
                          'h-4 w-4 rounded-full',
                          state === 'Active' ? 'bg-red-400' : state === 'All' ? 'hidden' : 'bg-green-8',
                        )}
                      />
                    }
                    key={state}
                  >
                    {state}
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
        {filteredData.map((bug) => (
          <Button
            onClick={() => setCurrentBug(bug)}
            key={bug._id}
            variant="light"
            className="h-48 border-b border-b-gray-4/20"
            radius="none"
            fullWidth
          >
            <div className="h-full w-full px-3 py-7">
              <div className="flex gap-6">
                <div className={classNames('h-8 w-8 rounded-full', bug.resolved ? 'bg-green-8' : 'bg-red-400')}></div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-base font-medium">Bug #{bug._id.slice(0, 4)}</p>
                    <p className="ml-auto">{moment(bug.createdAt).format('DD, MMM YYYY')}</p>
                  </div>
                  <p
                    className=" lines-ellipsis mt-3 min-w-0 whitespace-break-spaces text-left font-light tracking-wide"
                    style={
                      {
                        '--number-of-lines': 3,
                      } as CSSProperties
                    }
                  >
                    {bug.description}
                  </p>
                  <Link className="mt-2 block w-fit" href={`/p/${bug.createdBy}`}>
                    {bug.createdBy}
                  </Link>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </ul>
      {currentBug ? (
        <div className="h-full flex-1 px-2 py-8 text-base">
          <Card className="min-h-full px-8 pb-8 pt-5">
            <CardHeader className="flex w-full items-center gap-8">
              <h2 className="text-xl font-medium">Bug #{currentBug._id}</h2>
              <p className="ml-auto text-sm text-gray-6/60">
                {moment(currentBug.createdAt).format('DD, MMM YYYY - hh:mm:ss')}
              </p>
              <Select
                onSelectionChange={handleSelectionChange as any}
                selectedKeys={selectedState}
                startContent={
                  <div
                    className={classNames(
                      'h-4 w-4 flex-shrink-0 rounded-full',
                      selectedState.keys().next().value !== 'Active' ? 'bg-green-8' : 'bg-red-400',
                    )}
                  />
                }
                size="sm"
                className="max-w-[200px]"
              >
                {['Active', 'Resolved'].map((state) => (
                  <SelectItem
                    startContent={
                      <div
                        className={classNames('h-4 w-4 rounded-full', state !== 'Active' ? 'bg-green-8' : 'bg-red-400')}
                      />
                    }
                    key={state}
                    value={state}
                  >
                    {state}
                  </SelectItem>
                ))}
              </Select>
              <Tooltip content={currentBug.createdByData.fullName || currentBug.createdByData.username}>
                <Link href={`/p/${currentBug.createdByData.username}`}>
                  <Avatar src={currentBug.createdByData.avatar || '/gray.png'} />
                </Link>
              </Tooltip>
            </CardHeader>
            <CardBody className="flex flex-col items-center gap-7">
              {currentBug.image && (
                <Image
                  alt="bug_image"
                  src={currentBug.image}
                  className="w-full max-w-[800px] rounded-xl"
                  width={4000}
                  height={4000}
                />
              )}
              <div className="mt-2 w-full max-w-[800px]">
                <p className="text-lg font-medium">Description</p>
                <p className="mt-2 font-light text-gray-6/70">{currentBug.description}</p>
              </div>
            </CardBody>
          </Card>
          <div className="h-8"></div>
        </div>
      ) : (
        <div className="flex h-full flex-1 items-center justify-center">Please select a bug.</div>
      )}
    </div>
  )
}

export default BugsPage
