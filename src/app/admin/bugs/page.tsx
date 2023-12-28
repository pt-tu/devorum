'use client'

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
  Tooltip,
} from '@nextui-org/react'
import classNames from 'classnames'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { CSSProperties, useState } from 'react'
import { TbFilter, TbFilterBolt } from 'react-icons/tb'

type Props = {
  bug: Report
}

const BugsPage = (props: Props) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['Active']))
  const [selectedState, setSelectedState] = useState(new Set(['Active']))

  return (
    <div className="flex h-[calc(100%-80px)] gap-6 overflow-y-auto border-t border-t-gray-4/20">
      <ul className="small-scrollbar sticky top-0 h-full max-w-[400px] flex-1 self-start overflow-y-scroll bg-dark-5">
        <div className="flex items-center gap-2 border-b border-b-gray-4/20 p-6">
          <Input fullWidth placeholder="Search bugs" />
          <Dropdown>
            <Badge content="" color="success" className="-mr-4">
              <DropdownTrigger>
                <Button className="-mr-4" size="lg" isIconOnly radius="full" variant="light">
                  <TbFilterBolt className="text-xl text-gray-6/70" />
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu
              variant="flat"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys as any}
            >
              <DropdownSection title="State">
                {['Active', 'Resolved'].map((state) => (
                  <DropdownItem
                    startContent={
                      <div
                        className={classNames('h-4 w-4 rounded-full', state !== 'Active' ? 'bg-green-8' : 'bg-red-400')}
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
        <Button variant="light" className="h-48 border-b border-b-gray-4/20" radius="none" fullWidth>
          <div className="h-full w-full px-3 py-7">
            <div className="flex gap-6">
              <div className="h-8 w-8 rounded-full bg-green-8"></div>
              <div className="min-w-0 flex-1 text-left">
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-base font-medium">Bug #03</p>
                  <p className="ml-auto">3d</p>
                </div>
                <p
                  className=" lines-ellipsis mt-3 min-w-0 whitespace-break-spaces text-left font-light tracking-wide"
                  style={
                    {
                      '--number-of-lines': 3,
                    } as CSSProperties
                  }
                >
                  Lorem ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum
                  lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
                </p>
                <Link className="mt-2 block w-fit" href={`/p/${'tuan-hda'}`}>
                  tuan-hda
                </Link>
              </div>
            </div>
          </div>
        </Button>
      </ul>
      <div className="h-full flex-1 px-2 py-8 text-base">
        <Card className="min-h-full px-8 pb-8 pt-5">
          <CardHeader className="flex w-full items-center gap-8">
            <h2 className="text-xl font-medium">Bug #03</h2>
            <p className="ml-auto text-sm text-gray-6/60">{moment().format('DD, MMM YYYY - hh:mm:ss')}</p>
            <Select
              onSelectionChange={setSelectedState as any}
              selectedKeys={selectedState}
              startContent={
                <div
                  className={classNames(
                    'h-4 w-4 flex-shrink-0 rounded-full',
                    selectedKeys.keys().next().value !== 'Active' ? 'bg-green-8' : 'bg-red-400',
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
            <Tooltip content={'Hoang Dinh Anh Tuan'}>
              <Link href={`/p/${'tuan-hda'}`}>
                <Avatar src="/gray.png" />
              </Link>
            </Tooltip>
          </CardHeader>
          <CardBody className="flex flex-col items-center gap-7">
            <Image
              alt="bug_image"
              src="/gray.png"
              className="w-full max-w-[800px] rounded-xl"
              width={200}
              height={200}
            />
            <div className="mt-2 w-full max-w-[800px]">
              <p className="text-lg font-medium">Description</p>
              <p className="mt-2 font-light text-gray-6/70">
                Lorem ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum
                lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
                Lorem ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum
                lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
                Lorem ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum
                lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
                Lorem ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum
                lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
                Lorem ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum
                lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum ipsum lorem ipsum
              </p>
            </div>
          </CardBody>
        </Card>
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default BugsPage
