import { Logo } from '@/assets'
import ThemeButton from '@/components/common/ThemeButton'
import User from '@/components/navigation/User'
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { FaPlay } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'

type Props = {
  options: {
    fontSize: string
    fontFamily: string
    tabSize: number
    formatOnSave: boolean
  }
  setOptions: (value: { fontSize: string; fontFamily: string; tabSize: number; formatOnSave: boolean }) => void
  processing?: boolean
  submit: () => void
  title?: string
}

const fontSize = ['12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px']
const fontFamilies = ['Fira Code', 'monospace', 'Arial']
const tabSizes = ['2', '4']

const Header = ({ title, options, setOptions, processing, submit }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className="sticky top-0 z-[11] col-span-2 grid grid-cols-3 items-center justify-center bg-dark-2 p-2">
        <div className="flex items-center gap-4">
          <Link href={'/'}>
            <Logo width={32} height={32} />
          </Link>
          <p className="text-sm">{title}</p>
        </div>
        <div className="flex items-center justify-center">
          {processing !== undefined && (
            <Button isLoading={processing} onClick={submit} color="primary" size="sm">
              <FaPlay />
              Run
            </Button>
          )}
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button onClick={onOpen} size="sm" radius="full" isIconOnly variant="light">
            <IoSettingsOutline className="text-xl text-default-500" />
          </Button>
          <User size="sm" />
          <ThemeButton size="sm" />
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editor Settings</ModalHeader>
              <ModalBody className="font-light">
                <div className="flex items-center justify-between">
                  <p>Font size</p>
                  <Select
                    labelPlacement="outside"
                    size="sm"
                    onSelectionChange={(keys) =>
                      setOptions({ ...options, fontSize: (keys as Set<string>).values().next().value })
                    }
                    defaultSelectedKeys={new Set([options.fontSize])}
                    className="max-w-[120px]"
                  >
                    {fontSize.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <p>Font family</p>
                  <Select
                    labelPlacement="outside"
                    size="sm"
                    onSelectionChange={(keys) =>
                      setOptions({ ...options, fontFamily: (keys as Set<string>).values().next().value })
                    }
                    defaultSelectedKeys={new Set([options.fontFamily])}
                    className="max-w-[160px]"
                  >
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <p>Tab size</p>
                  <Select
                    labelPlacement="outside"
                    size="sm"
                    onSelectionChange={(keys) =>
                      setOptions({ ...options, tabSize: (keys as Set<number>).values().next().value })
                    }
                    defaultSelectedKeys={new Set([String(options.tabSize)])}
                    className="max-w-[120px]"
                  >
                    {tabSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <p>Format on save</p>
                  <Checkbox
                    isSelected={options.formatOnSave}
                    onValueChange={(value) => setOptions({ ...options, formatOnSave: value })}
                  ></Checkbox>
                </div>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
