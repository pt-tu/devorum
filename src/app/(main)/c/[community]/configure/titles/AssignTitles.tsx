import useCommunityData from '@/hooks/useCommunityData'
import {
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import React, { useState } from 'react'

type Props = {
  community: string
}

const AssignTitles = ({ community }: Props) => {
  const { isLoading, data, mutate } = useCommunityData(community)
  const [page, setPage] = useState(0)
  const pages = 5

  return (
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
  )
}

export default AssignTitles
