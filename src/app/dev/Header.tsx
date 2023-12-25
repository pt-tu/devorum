'use client'
import { Logo } from '@/assets'
import ThemeButton from '@/components/common/ThemeButton'
import User from '@/components/navigation/User'
import { socket } from '@/configs/socketIO'
import useListProfilesData from '@/hooks/useListProfilesData'
import useLiveRoomDetailData from '@/hooks/useLiveRoomDetailData'
import { updateLiveRoomService } from '@/services/liveService'
import { useThemeStore } from '@/store/useThemeStore'
import { useUserStore } from '@/store/useUserStore'
import { Options } from '@/types/dev.type'
import { User as UserType } from '@/types/user.type'
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Selection,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa6'
import { IoMdSearch } from 'react-icons/io'
import { IoClose, IoSettingsOutline } from 'react-icons/io5'

type Props = {
  options: Options
  setOptions: (value: Options) => void
  processing?: boolean
  submit: () => void
  title?: string
  participants?: UserType[]
}

const fontSize = ['12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px']
const fontFamilies = ['Fira Code', 'monospace', 'Arial']
const tabSizes = ['2', '4']

const Header = ({ participants, title, options, setOptions, processing, submit }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [accessibleUsers, setAccessibleUsers] = useState<Set<string>>(new Set([]))
  const [visibility, setVisibility] = useState(new Set(['public']))
  const { id }: { id: string } = useParams()
  const [search, setSearch] = useState('')
  const { data: profiles } = useListProfilesData()
  const user = useUserStore((state) => state.user)
  const { data: liveRoom, mutate } = useLiveRoomDetailData(id || '')
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    if (liveRoom) {
      setVisibility(new Set([liveRoom.visibility]))
      const newState = new Set(liveRoom.accessibleUsers)
      setAccessibleUsers(newState)
    }
  }, [liveRoom])

  const handleChange = async (keys: Selection) => {
    setVisibility(keys as Set<string>)
    if (id) {
      await updateLiveRoomService(id, {
        visibility: (keys as Set<string>).values().next().value,
      })
      mutate()
    }
  }

  const handleAddUser = async (username: string) => {
    accessibleUsers.add(username)
    if (id) {
      await updateLiveRoomService(id, {
        accessibleUsers: Array.from(accessibleUsers.values()),
      })
    }
    setAccessibleUsers(new Set(accessibleUsers))
  }

  const handleDeleteUser = async (username: string) => {
    accessibleUsers.delete(username)
    if (id) {
      await updateLiveRoomService(id, {
        accessibleUsers: Array.from(accessibleUsers.values()),
      })
      socket.emit('kick', {
        room: id,
        username: username,
      })
    }
    setAccessibleUsers(new Set(accessibleUsers))
  }

  return (
    <>
      <div
        className={classNames(
          'sticky top-0 z-[11] col-span-2 grid grid-cols-3 items-center justify-center p-2',
          theme === 'light' ? 'bg-dark-1' : 'bg-dark-2',
        )}
      >
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
          <div className="flex items-center gap-2">
            {participants &&
              participants.map((user) => (
                <Tooltip key={user._id} content={user.username}>
                  <User key={user._id} size="sm" user={user} />
                </Tooltip>
              ))}
          </div>
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

                {liveRoom?.owner === user?.username && window.location.href.includes('live') && (
                  <div className="flex items-center justify-between">
                    <p>Visibility</p>
                    <Select
                      labelPlacement="outside"
                      size="sm"
                      onSelectionChange={handleChange}
                      defaultSelectedKeys={visibility}
                      className="max-w-[120px]"
                    >
                      {['public', 'private'].map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
              </ModalBody>
              <Divider />
              {visibility.values().next().value === 'private' && (
                <>
                  <div className="mt-4 flex items-center gap-6 px-6">
                    <p className="font-light">Add users</p>
                    <Input
                      value={search}
                      className="flex-1"
                      size="sm"
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Add"
                      startContent={<IoMdSearch className="text-2xl" />}
                    />
                  </div>
                  <div className="my-4 max-h-[70vh] overflow-y-auto px-2">
                    {search &&
                      profiles
                        ?.filter(
                          (profile) =>
                            profile.username.toLowerCase().includes(search.toLowerCase()) &&
                            profile.username !== user?.username,
                        )
                        .slice(0, 6)
                        .map((profile) => (
                          <Button
                            onClick={() => handleAddUser(profile.username)}
                            key={profile._id}
                            size="sm"
                            variant="light"
                            fullWidth
                            className="h-16 px-4 text-left"
                          >
                            <div key={profile._id} className="flex w-full items-center gap-4">
                              <Avatar src={profile.avatar} />
                              <div className="text-left">
                                <p className="font-base">{profile.username}</p>
                                <p className="text-base font-light">{profile.fullName}</p>
                              </div>
                            </div>
                          </Button>
                        ))}
                  </div>

                  <Divider />
                  <div className="mt-4 items-center gap-6 px-6">
                    <p className="font-light">Accessible users</p>
                    <ul className="mt-2 flex flex-col gap-4">
                      {Array.from(accessibleUsers.values()).length > 0 ? (
                        Array.from(accessibleUsers.values()).map((user) => (
                          <Button endContent={<IoClose onClick={() => handleDeleteUser(user)} />} fullWidth key={user}>
                            <div className="w-full text-left">{user}</div>
                          </Button>
                        ))
                      ) : (
                        <div>No accessible user</div>
                      )}
                    </ul>
                  </div>
                </>
              )}

              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
