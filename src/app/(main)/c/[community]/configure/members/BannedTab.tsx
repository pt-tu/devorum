import useCommunityBannedUsersData from '@/hooks/useCommunityBannedUsersData'
import useCommunityData from '@/hooks/useCommunityData'
import useListProfilesData from '@/hooks/useListProfilesData'
import { banUserService, deleteBannedUserService } from '@/services/communityService'

import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
  user,
} from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import { TbTrash } from 'react-icons/tb'

type Props = {
  community: string
}

const BannedTab = ({ community }: Props) => {
  const [searchBanned, setSearchBanned] = useState('')
  const { data: membersData, isLoading } = useListProfilesData()
  const { data: bannedUsersData, mutate } = useCommunityBannedUsersData(community)
  const { data: profileData, isLoading: isProfileLoading } = useListProfilesData()
  const { data: communityData } = useCommunityData(community)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const filteredMembersData = useMemo(() => {
    if (!membersData || !bannedUsersData) return []
    return membersData.filter(
      (member) =>
        (member.username.toLowerCase().includes(searchBanned.toLowerCase()) ||
          member.fullName?.toLowerCase().includes(searchBanned.toLowerCase())) &&
        bannedUsersData.find((banned) => banned.username === member.username),
    )
  }, [membersData, bannedUsersData, searchBanned])

  const filteredBannedUsersData = useMemo(() => {
    if (!bannedUsersData || !profileData || !communityData) return []

    return profileData.filter(
      (profile) =>
        !bannedUsersData.find((banned) => banned.username === profile.username) &&
        profile._id !== communityData.createdBy,
    )
  }, [bannedUsersData, communityData, profileData])

  if (isLoading || !membersData || isProfileLoading || !profileData || !bannedUsersData)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const handleDeleteBannedUser = (username: string) => async () => {
    try {
      await deleteBannedUserService(community, username)
      mutate()
    } catch (error) {
      console.log('delete banned user error:', error)
    }
  }

  const handleBanUser = (username: string | null) => async () => {
    try {
      if (username === null) return
      await banUserService(community, username)
      onClose()
      mutate()
    } catch (error) {
      console.log('ban user error:', error)
    }
  }

  const onSelectionChange = (key: any) => {
    setCurrentUser(key as string)
  }

  return (
    <>
      <Input
        isClearable
        value={searchBanned}
        onChange={(e) => setSearchBanned(e.target.value)}
        onClear={() => setSearchBanned('')}
        size="lg"
        className="mb-6"
        placeholder="Search for banned users"
      />

      <div className="flex-end mb-6 flex">
        <Button onClick={onOpen} size="lg" className="ml-auto" color="danger">
          Ban User
        </Button>
      </div>

      {membersData.length === 0 && 'Your community has no members except you. How sad :(.'}
      {filteredMembersData.map((member) => (
        <div key={member._id} className="flex items-center gap-6 rounded-xl bg-dark-1 px-7 py-4">
          <Avatar src={member.avatar} size="lg" />
          <div>
            <p>{member.username}</p>
            {member.fullName && <p className="font-light">{member.fullName}</p>}
          </div>
          <Button
            onClick={handleDeleteBannedUser(member.username)}
            className="ml-auto"
            isIconOnly
            variant="light"
            size="lg"
            radius="full"
          >
            <TbTrash className="text-xl" />
          </Button>
        </div>
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Invite User</ModalHeader>
              <ModalBody className="font-light">
                <Autocomplete
                  onSelectionChange={onSelectionChange}
                  fullWidth
                  size="lg"
                  label="Select a user"
                  placeholder="Select"
                  labelPlacement="outside"
                >
                  {filteredBannedUsersData.map((member) => (
                    <AutocompleteItem key={member.username} value={member.username}>
                      {member.username}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="danger" onClick={handleBanUser(currentUser)}>
                  Ban
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default BannedTab
