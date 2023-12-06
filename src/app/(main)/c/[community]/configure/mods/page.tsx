'use client'
import ModCard from '@/components/community/ModCard'
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useState } from 'react'

const ConfigureTheme = ({ params }: { params: Params }) => {
  const community = params.community
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <title>Configure user titles</title>
      <div className="w-full space-y-7 rounded-xl bg-dark-2 px-8 py-7">
        <h1 className="text-2xl font-medium">Adjust moderators for `{community}`</h1>
        <Button onClick={() => setIsOpen(true)} color="primary" size="lg">
          Add Mod
        </Button>
        <div className="grid grid-cols-3 gap-6">
          <ModCard username="tuan-hda" isOwner />
          <ModCard username="tuan-hd" />
          <ModCard username="tuan-ha" />
          <ModCard username="tuan-da" />
          <ModCard username="tuan-da" />
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Mod</ModalHeader>
              <ModalBody className="font-light">
                <Autocomplete fullWidth size="lg" label="Select a user" placeholder="Select" labelPlacement="outside">
                  {[
                    { label: 'Cat', value: 'cat', description: 'The second most popular pet in the world' },
                    { label: 'Dog', value: 'dog', description: 'The most popular pet in the world' },
                    { label: 'Elephant', value: 'elephant', description: 'The largest land animal' },
                    { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
                    { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
                    { label: 'Giraffe', value: 'giraffe', description: 'The tallest land animal' },
                    {
                      label: 'Dolphin',
                      value: 'dolphin',
                      description: 'A widely distributed and diverse group of aquatic mammals',
                    },
                    { label: 'Penguin', value: 'penguin', description: 'A group of aquatic flightless birds' },
                    { label: 'Zebra', value: 'zebra', description: 'A several species of African equids' },
                    {
                      label: 'Shark',
                      value: 'shark',
                      description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton',
                    },
                    {
                      label: 'Whale',
                      value: 'whale',
                      description: 'Diverse group of fully aquatic placental marine mammals',
                    },
                    { label: 'Otter', value: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
                    { label: 'Crocodile', value: 'crocodile', description: 'A large semiaquatic reptile' },
                  ].map((animal) => (
                    <AutocompleteItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
