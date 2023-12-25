'use client'
import useCommunityData from '@/hooks/useCommunityData'
import useCommunityMembersData from '@/hooks/useCommunityMembersData'
import useListProfilesData from '@/hooks/useListProfilesData'
import { inviteUserService, removeUserFromCommunityService } from '@/services/communityService'
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
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { TbDots, TbDotsCircleHorizontal } from 'react-icons/tb'

const MembersPage = ({ params }: { params: any }) => {
  const community = params.community
  const { data: communityData } = useCommunityData(community)
  const { data: membersData, isLoading, mutate } = useCommunityMembersData(community)
  const { data: profileData, isLoading: isProfileLoading } = useListProfilesData()
  const [searchMembers, setSearchMembers] = useState('')
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const filteredMembersData = useMemo(() => {
    if (!membersData) return []
    return membersData.filter(
      (member) =>
        member.user.username.toLowerCase().includes(searchMembers.toLowerCase()) ||
        member.user.fullName?.toLowerCase().includes(searchMembers.toLowerCase()),
    )
  }, [searchMembers, membersData])

  const nonMembersData = useMemo(() => {
    if (!membersData || !profileData || !communityData) return []
    return profileData.filter(
      (profile) =>
        !membersData.find((member) => member.user._id === profile._id) && profile._id !== communityData.createdBy,
    )
  }, [communityData, membersData, profileData])

  if (isLoading || !membersData || isProfileLoading || !profileData)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

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

  const onSelectionChange = (key: any) => {
    setCurrentUser(key as string)
  }

  const handleRemoveUser = (username: string) => async () => {
    try {
      await removeUserFromCommunityService(community, username)
      mutate()
    } catch (error) {
      console.log('remove user from community error:', error)
    }
  }

  return (
    <>
      <title>Configure user titles</title>

      <div className="w-full space-y-7 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Manage members of this community</h1>
        <Tabs size="lg">
          <Tab key="members" title="Members">
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
                  <DropdownMenu>
                    <DropdownItem onClick={handleRemoveUser(member.user.username)} key="remove_user">
                      Remove {member.user.username}
                    </DropdownItem>
                    <DropdownItem key="ban_user" color="danger" className="">
                      Ban {member.user.username}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ))}
          </Tab>
          <Tab key="banned" title="Banned"></Tab>
        </Tabs>
      </div>

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

export default MembersPage
