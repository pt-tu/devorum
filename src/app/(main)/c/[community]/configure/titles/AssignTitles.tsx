import useCommunityData from '@/hooks/useCommunityData'
import useCommunityMembersData from '@/hooks/useCommunityMembersData'
import useUserTitlesData from '@/hooks/useUserTitlesData'
import { updateCommunityMemberStatusService } from '@/services/communityService'
import {
  Pagination,
  Select,
  SelectItem,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useTable,
} from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  community: string
}

const AssignTitles = ({ community }: Props) => {
  const { isLoading, data, mutate } = useCommunityMembersData(community)
  const { data: userTitles } = useUserTitlesData(community)
  const [page, setPage] = useState(0)

  if (!data || !userTitles) {
    return null
  }

  const pages = Math.ceil(data?.length / 10)
  const selectionChangeHandler = (member: string) => async (keys: Selection) => {
    try {
      const newTitleId = (keys as Set<string>).keys().next().value
      await updateCommunityMemberStatusService(community, member, {
        title: newTitleId,
      })
      mutate()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

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
              page={page}
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
      <TableBody isLoading={isLoading}>
        {data.map((member) => (
          <TableRow key={member._id}>
            <TableCell>{member.user.fullName}</TableCell>
            <TableCell>{member.user.username}</TableCell>
            <TableCell>
              <Select
                selectedKeys={new Set(member.title ? [member.title] : [])}
                onSelectionChange={selectionChangeHandler(member.user.username)}
                aria-label="Select a title"
                items={userTitles}
                placeholder="Select a title"
              >
                {(title) => (
                  <SelectItem aria-label={title.name} key={title._id}>
                    <p className="text-base">{title.name}</p>
                  </SelectItem>
                )}
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AssignTitles
