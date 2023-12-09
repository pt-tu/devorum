'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

type Props = {
  isOpen: boolean
  onSecondary?: () => void
  secondary?: string
  onPrimary?: () => void
  primary?: string
  header?: string
  body: string
}

export default function ForbiddenModal(props: Props) {
  return (
    <>
      {props.isOpen && <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-white/30 backdrop-blur-md"></div>}
      <Modal isOpen={props.isOpen} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.header}</ModalHeader>
              <ModalBody>
                <p>{props.body}</p>
              </ModalBody>
              <ModalFooter>
                {props.onSecondary && (
                  <Button onClick={props.onSecondary} color="danger" variant="light" onPress={onClose}>
                    {props.secondary}
                  </Button>
                )}
                {props.onPrimary && (
                  <Button onClick={props.onPrimary} color="primary" onPress={onClose}>
                    {props.primary}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
