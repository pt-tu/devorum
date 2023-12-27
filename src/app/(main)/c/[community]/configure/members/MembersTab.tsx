import useCommunityBannedUsersData from '@/hooks/useCommunityBannedUsersData'
import useCommunityData from '@/hooks/useCommunityData'
import useCommunityMembersData from '@/hooks/useCommunityMembersData'
import useListProfilesData from '@/hooks/useListProfilesData'
import { banUserService, inviteUserService, removeUserFromCommunityService } from '@/services/communityService'
import { useUserStore } from '@/store/useUserStore'
import { JoinedUser } from '@/types/community.type'
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
import React, { useCallback, useMemo, useState } from 'react'
import { TbDots } from 'react-icons/tb'

type Props = {
  community: string
}

const MembersTab = ({ community }: Props) => {
  const [searchMembers, setSearchMembers] = useState('')
  const { data: membersData, isLoading, mutate } = useCommunityMembersData(community)
  const { data: bannedUsersData, mutate: mutateBanned } = useCommunityBannedUsersData(community)
  const { data: communityData, mutate: mutateCommunity } = useCommunityData(community)
  const user = useUserStore((state) => state.user)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const { data: profileData, isLoading: isProfileLoading } = useListProfilesData()

  const handleBanUser = useCallback(
    (username: string) => async () => {
      try {
        await banUserService(community, username)
        mutateBanned()
        mutate()
        mutateCommunity()
      } catch (error) {
        console.log('ban user error:', error)
      }
    },
    [community, mutate, mutateBanned, mutateCommunity],
  )

  const handleRemoveUser = useCallback(
    (username: string) => async () => {
      try {
        await removeUserFromCommunityService(community, username)
        mutate()
        mutateCommunity()
      } catch (error) {
        console.log('remove user from community error:', error)
      }
    },
    [community, mutate, mutateCommunity],
  )

  const getDropDownList = useCallback(
    (member: JoinedUser) => {
      let list: JSX.Element[] = []

      if (
        communityData?.moderators.find((mod) => mod.username === member.user.username) &&
        communityData.createdBy !== user?._id
      ) {
        return list
      }

      list.push(
        <DropdownItem onClick={handleRemoveUser(member.user.username)} key="remove_user">
          Remove {member.user.username}
        </DropdownItem>,
        <DropdownItem onClick={handleBanUser(member.user.username)} key="ban_user" color="danger" className="">
          Ban {member.user.username}
        </DropdownItem>,
      )

      return list
    },
    [communityData, handleBanUser, handleRemoveUser, user],
  )

  const filteredMembersData = useMemo(() => {
    if (!membersData) return []
    return membersData.filter(
      (member) =>
        member.user.username.toLowerCase().includes(searchMembers.toLowerCase()) ||
        member.user.fullName?.toLowerCase().includes(searchMembers.toLowerCase()),
    )
  }, [searchMembers, membersData])

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleInvite = async () => {
    try {
      if (currentUser) {
        await inviteUserService(community, currentUser)
        onClose()
      }
    } catch (error) {
      console.log('Send invitation error:', error)
    }
  }

  const nonMembersData = useMemo(() => {
    if (!membersData || !profileData || !communityData || !bannedUsersData) return []
    return profileData.filter(
      (profile) =>
        !membersData.find((member) => member.user._id === profile._id) &&
        profile._id !== communityData.createdBy &&
        !bannedUsersData.find((banned) => banned.username === profile.username),
    )
  }, [bannedUsersData, communityData, membersData, profileData])

  if (isLoading || !membersData || isProfileLoading || !profileData || !bannedUsersData)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  const onSelectionChange = (key: any) => {
    setCurrentUser(key as string)
  }

  return (
    <>
      <Input
        isClearable
        value={searchMembers}
        onChange={(e) => setSearchMembers(e.target.value)}
        onClear={() => setSearchMembers('')}
        size="lg"
        className="mb-6"
        placeholder="Search for member"
      />
      <div className="flex-end mb-6 flex">
        <Button onClick={onOpen} size="lg" className="ml-auto" color="primary">
          Invite User
        </Button>
      </div>
      {membersData.length === 0 && 'Your community has no members except you. How sad :(.'}
      {filteredMembersData.map((member) => (
        <div key={member._id} className="flex items-center gap-6 rounded-xl bg-dark-1 px-7 py-4">
          <Avatar src={member.user.avatar} size="lg" />
          <div>
            <p>{member.user.username}</p>
            {member.user.fullName && <p className="font-light">{member.user.fullName}</p>}
          </div>
          <Dropdown size="lg">
            <DropdownTrigger>
              <Button className="ml-auto" isIconOnly variant="light" size="lg" radius="full">
                <TbDots className="text-xl" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>{getDropDownList(member)}</DropdownMenu>
          </Dropdown>
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
                  {nonMembersData.map((member) => (
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
                <Button color="primary" onClick={handleInvite}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default MembersTab
