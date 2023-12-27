'use client'
import ModCard from '@/components/community/ModCard'
import useCommunityData from '@/hooks/useCommunityData'
import useCommunityMembersData from '@/hooks/useCommunityMembersData'
import { addModService, deleteModService } from '@/services/communityService'
import { useUserStore } from '@/store/useUserStore'
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Selection,
} from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { Key, useMemo, useState } from 'react'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community
  const user = useUserStore((state) => state.user)
  const { data, isLoading, mutate } = useCommunityData(community)
  const { data: membersData } = useCommunityMembersData(community)
  const [isOpen, setIsOpen] = useState(false)
  const [currentMod, setCurrentMod] = useState<string | null>(null)

  const filteredMembersData = useMemo(() => {
    if (!membersData) return []
    return membersData.filter((member) => {
      const isMod = data?.moderators.find((mod) => mod._id === member.user._id)
      return !isMod
    })
  }, [data?.moderators, membersData])

  const addModHandler = async () => {
    try {
      if (currentMod) {
        await addModService(community, currentMod)
        setIsOpen(false)
        mutate()
      }
    } catch (error) {
      console.log('addModHandler error', error)
    }
  }

  const onSelectionChange = (key: Key) => {
    setCurrentMod(key as string)
  }

  const closeHandler = (onClose: () => void) => () => {
    onClose()
    setCurrentMod(null)
  }

  const deleteModHandler = (username: string) => async () => {
    try {
      await deleteModService(community, username)
      mutate()
    } catch (error) {
      console.log('deleteModHandler error', error)
    }
  }

  if (isLoading || !data || !membersData)
    return (
      <div className="col-span-9 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <>
      <title>Configure user titles</title>
      <div className="w-full space-y-7 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Adjust moderators for `{community}`</h1>
        {data.createdBy === user?._id && (
          <Button onClick={() => setIsOpen(true)} color="primary" size="lg">
            Add Mod
          </Button>
        )}
        <div className="grid grid-cols-3 gap-6">
          {data.moderators.map((mod) => (
            <ModCard
              key={mod._id}
              data={mod}
              isOwner={mod._id === data.createdBy}
              onDelete={deleteModHandler(mod.username)}
              allowDelete={data.createdBy === user?._id}
              username={mod.username}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Mod</ModalHeader>
              <ModalBody className="font-light">
                <Autocomplete
                  onSelectionChange={onSelectionChange}
                  fullWidth
                  size="lg"
                  label="Select a user"
                  placeholder="Select"
                  labelPlacement="outside"
                >
                  {filteredMembersData.map((member) => (
                    <AutocompleteItem key={member.user.username} value={member.user.username}>
                      {member.user.username}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeHandler(onClose)}>
                  Close
                </Button>
                <Button color="primary" onPress={addModHandler}>
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

export default ConfigureTheme
