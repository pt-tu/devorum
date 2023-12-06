'use client'
import TitleChip from '@/components/community/TitleChip'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community
  const [page, setPage] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const pages = 5

  const onCancelHandler = () => {
    setShowForm(false)
  }

  return (
    <>
      <title>Configure user titles</title>
      <div className="w-full space-y-6 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Configure user titles</h1>
        <Divider />
        <Tabs aria-label="Options" size="lg">
          <Tab key="Initialize" title="Initialize">
            <div className="flex flex-wrap gap-6">
              <TitleChip />
              <Button radius="full" className="h-14" onClick={() => setShowForm((prev) => !prev)}>
                <GoPlus className="text-2xl" />
              </Button>
            </div>
          </Tab>
          <Tab key="Assign" title="Assign">
            <Table
              aria-label="Example static collection table"
              bottomContent={
                pages > 0 ? (
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={1}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                ) : null
              }
            >
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>USERNAME</TableColumn>
                <TableColumn>TITLE</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>
                    <Select
                      items={[
                        { label: 'Heo', key: 'Heo' },
                        { label: 'Cho', key: 'Cho' },
                      ]}
                      size="sm"
                      placeholder="Select an animal"
                      className="max-w-xs"
                    >
                      {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>Zoey Lang</TableCell>
                  <TableCell>Technical Lead</TableCell>
                  <TableCell>
                    <Select
                      items={[
                        { label: 'Heo', key: 'Heo' },
                        { label: 'Cho', key: 'Cho' },
                      ]}
                      size="sm"
                      placeholder="Select an animal"
                      className="max-w-xs"
                    >
                      {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>Jane Fisher</TableCell>
                  <TableCell>Senior Developer</TableCell>
                  <TableCell>
                    <Select
                      items={[
                        { label: 'Heo', key: 'Heo' },
                        { label: 'Cho', key: 'Cho' },
                      ]}
                      size="sm"
                      placeholder="Select an animal"
                      className="max-w-xs"
                    >
                      {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Tab>
        </Tabs>

        {showForm && (
          <Card>
            <CardBody>
              <form className="space-y-7 p-4">
                <h2 className="text-2xl font-medium">Create new title</h2>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Title name, e.g. Senior"
                  label={<p className="text-base">Title Name</p>}
                  labelPlacement="outside"
                />
                <Input
                  size="lg"
                  type="text"
                  placeholder="Description"
                  label={<p className="text-base">Description</p>}
                  labelPlacement="outside"
                />
                <div className="flex gap-7">
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Background Color"
                    label={<p className="text-base">Background Color</p>}
                    labelPlacement="outside"
                  />
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Text Color"
                    label={<p className="text-base">Text Color</p>}
                    labelPlacement="outside"
                  />
                </div>
                <div className="flex gap-5">
                  <Button color="primary" size="lg">
                    Save
                  </Button>
                  <Button onClick={onCancelHandler} variant="flat" size="lg">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  )
}

export default ConfigureTheme
