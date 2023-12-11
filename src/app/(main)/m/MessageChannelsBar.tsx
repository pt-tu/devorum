import { socket } from '@/configs/socketIO'
import useListProfilesData from '@/hooks/useListProfilesData'
import useRoomsData from '@/hooks/useRoomsData'
import { getRoomService } from '@/services/chatService'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import {
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
} from '@nextui-org/react'
import classNames from 'classnames'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoMdSearch } from 'react-icons/io'

const MessageChannelsBar = () => {
  const { roomId } = useParams()
  const { data: rooms, isLoading } = useRoomsData()
  const { data: profiles } = useListProfilesData()
  const [search, setSearch] = useState('')
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (rooms && user) {
      socket.emit(
        'joinRooms',
        rooms.map((room) => room._id),
      )
    }
  }, [rooms, user])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (!rooms || isLoading || !user || !profiles)
    return (
      <div className="col-span-3 flex h-[calc(100vh-80px)] w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )

  const handleCreateRoom = (username: string, onClose: () => void) => async () => {
    try {
      const response = await getRoomService(username)
      if (rooms.find((room) => room._id === response.data._id)) {
        router.push(`/m/${response.data._id}`)
      } else {
        window.location.href = `/m/${response.data._id}`
      }
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="small-scrollbar relative col-span-3 h-full overflow-y-auto border-r border-r-gray-4/30 bg-dark-2">
      <ul className=" space-y-2 p-2">
        <Input startContent={<IoMdSearch className="text-2xl" />} className="px-2" size="lg" placeholder="Search" />
        {rooms.length === 0 ? (
          <div className="flex h-[calc(100vh-80px)] items-center justify-center">You have no messages.</div>
        ) : (
          rooms.map((room) => (
            <Button
              onClick={() => router.push(`/m/${room._id}`)}
              key={room._id}
              fullWidth
              variant={roomId === room._id ? 'solid' : 'light'}
              className={classNames('h-20', roomId === room._id && 'pointer-events-none bg-default-200')}
            >
              <div className="relative flex h-full w-full items-center gap-6">
                <Avatar size="lg" />
                <div className="text-left">
                  <p className="text-base">
                    {room.participants.find((participant) => participant !== user.username) || user.username}
                  </p>
                  <p className="text-base font-light">9 3 Hoàng: Hello world</p>
                </div>
                <p className="absolute right-2 top-2 text-sm font-light">Fri</p>
              </div>
            </Button>
          ))
        )}
      </ul>

      <Button
        radius="full"
        onClick={() => {
          onOpen()
          setSearch('')
        }}
        isIconOnly
        size="lg"
        className="absolute bottom-4 right-2 h-16 w-16"
        color="primary"
      >
        <IoMdAdd className="text-2xl" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Message To</ModalHeader>
              <ModalBody>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  startContent={<IoMdSearch className="text-2xl" />}
                  size="lg"
                />
                <div className="max-h-[70vh] overflow-y-auto">
                  {search &&
                    profiles
                      .filter(
                        (profile) =>
                          profile.username.toLowerCase().includes(search.toLowerCase()) &&
                          profile.username !== user.username,
                      )
                      .slice(0, 6)
                      .map((profile) => (
                        <Button
                          onClick={handleCreateRoom(profile.username, onClose)}
                          key={profile._id}
                          size="lg"
                          variant="light"
                          fullWidth
                          className="h-16 px-4 text-left"
                        >
                          <div key={profile._id} className="flex w-full items-center gap-4">
                            <Avatar size="lg" />
                            <div className="text-left">
                              <p className="font-base">{profile.username}</p>
                              <p className="text-base font-light">{profile.fullName}</p>
                            </div>
                          </div>
                        </Button>
                      ))}
                </div>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MessageChannelsBar
