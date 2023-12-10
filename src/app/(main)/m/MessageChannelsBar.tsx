import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import classNames from 'classnames'
import { channel } from 'diagnostics_channel'
import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoMdSearch } from 'react-icons/io'

const channels = [1, 2, 3, 4, 5, 6]

const MessageChannelsBar = () => {
  const [selected, setSelected] = useState(1)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="small-scrollbar relative col-span-3 h-full overflow-y-auto border-r border-r-gray-4/30 bg-dark-2">
      <ul className=" space-y-2 p-2">
        <Input startContent={<IoMdSearch className="text-2xl" />} className="px-2" size="lg" placeholder="Search" />
        {channels.length === 0 ? (
          <div className="flex h-[calc(100vh-80px)] items-center justify-center">You have no messages.</div>
        ) : (
          channels.map((chan) => (
            <Button
              onClick={() => setSelected(chan)}
              key={chan}
              fullWidth
              variant={selected === chan ? 'solid' : 'light'}
              className={classNames('h-20', selected === chan && 'pointer-events-none bg-default-200')}
            >
              <div className="relative flex h-full w-full items-center gap-6">
                <Avatar size="lg" />
                <div className="text-left">
                  <p className="text-base">dev deism</p>
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
        onClick={onOpen}
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
                <Input placeholder="Search" startContent={<IoMdSearch className="text-2xl" />} size="lg" />
                <div className="max-h-[70vh] overflow-y-auto">
                  {channels.map((chan) => (
                    <Button
                      onClick={onClose}
                      key={chan}
                      size="lg"
                      variant="light"
                      fullWidth
                      className="h-16 px-4 text-left"
                    >
                      <div className="flex w-full items-center gap-4">
                        <Avatar size="lg" />
                        <div className="text-left">
                          <p className="text-base">dev deism</p>
                          <p className="font-light">tuan-hda</p>
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
