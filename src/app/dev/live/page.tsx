'use client'
import React, { useState } from 'react'
import Header from '../Header'
import {
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
import { IoSearchSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { createLiveRoomService } from '@/services/liveService'
import { useRouter } from 'next/navigation'
import useLiveRoomsData from '@/hooks/useLiveRoomsData'
import moment from 'moment'
import Link from 'next/link'
import { FaRegCircleQuestion } from 'react-icons/fa6'
import { Options } from '@/types/dev.type'
import { useUserStore } from '@/store/useUserStore'

const Live = () => {
  const { data, mutate } = useLiveRoomsData()
  const [search, setSearch] = useState('')
  const user = useUserStore((state) => state.user)
  const filteredData = data?.filter(
    (liveRoom) =>
      (liveRoom.owner.toLowerCase().includes(search.toLowerCase()) || liveRoom._id.includes(search.toLowerCase())) &&
      (liveRoom.visibility === 'public' || liveRoom.owner === user?.username),
  )
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [options, setOptions] = useState<Options>({
    fontSize: '13px' as unknown as number,
    fontFamily: 'Fira Code',
    tabSize: 2,
    formatOnSave: false,
  })

  const createRoom = async () => {
    try {
      setLoading(true)
      const response = await createLiveRoomService()
      console.log(response)
      const id = response.data._id
      mutate()
      router.push('/dev/live/' + id)
    } catch (error) {
      toast.error((error as any)?.message)
    } finally {
      setLoading(false)
    }
  }

  if (!filteredData)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <div className="">
      <title>Lobby</title>
      <Header options={options} setOptions={setOptions} submit={() => {}} />
      <div className="mt-4 px-10 py-8">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-medium">Lobby</h1>
          <Button onClick={onOpen} isIconOnly radius="full" className="ml-auto" variant="light">
            <FaRegCircleQuestion className="text-xl text-default-500" />
          </Button>
          <Input
            classNames={{
              inputWrapper: 'bg-dark-5',
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="flat"
            className="w-fit"
            size="sm"
            type="email"
            placeholder="Search room..."
            startContent={<IoSearchSharp />}
          />
          <Button isLoading={loading} color="primary" onClick={createRoom}>
            Create Room
          </Button>
        </div>
        <div className="auto-grid mt-8 gap-6">
          {filteredData.length === 0 ? (
            <div className="h-full w-full">No room found.</div>
          ) : (
            filteredData.map((liveRoom) => (
              <Button
                as={Link}
                href={'/dev/live/' + liveRoom._id}
                key={liveRoom._id}
                className="h-fit rounded-xl bg-dark-5 p-4 shadow-sm"
                fullWidth
              >
                <div className="h-full w-full text-left">
                  <p>Room</p>
                  <p className="font-light">{liveRoom._id}</p>
                  <p className="mt-2">Owner</p>
                  <p className="font-light">{liveRoom.owner}</p>
                  <p className="mt-2">Created At</p>
                  <p className="font-light">{moment(liveRoom.createdAt).format('hh:mm, DD MMM YYYY')}</p>
                </div>
              </Button>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                <p>Room will disappear after 5 minutes if no one is in the room.</p>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Live
