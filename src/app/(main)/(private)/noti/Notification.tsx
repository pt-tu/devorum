import IconMap from '@/configs/iconMap'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useCallback, useMemo } from 'react'
import { BiDotsHorizontal } from 'react-icons/bi'
import { Notification as NotificationType } from '@/types/notification.type'
import moment from 'moment'
import {
  deleteNotificationService,
  listNotificationsService,
  updateNotificationService,
} from '@/services/notificationService'
import { useNotificationStore } from '@/store/useNotificationStore'

type Props = {
  data: NotificationType
}

const Notification = ({ data }: Props) => {
  const loadNotifications = useNotificationStore((state) => state.loadNotifications)

  const listNotifications = async () => {
    try {
      const response = await listNotificationsService()
      return response.data
    } catch (error) {
      console.log('List notifications error:', error)
      return []
    }
  }

  const markUnread = useCallback(
    async (target: boolean) => {
      try {
        await updateNotificationService(data._id, { isRead: target })
        loadNotifications(await listNotifications())
      } catch (error) {
        console.log('Mark unread notification error:', error)
      }
    },
    [data._id, loadNotifications],
  )

  const deleteNoti = useCallback(async () => {
    try {
      await deleteNotificationService(data._id)
      loadNotifications(await listNotifications())
    } catch (error) {
      console.log('Delete notification error:', error)
    }
  }, [data._id, loadNotifications])

  const handleClick = () => {
    markUnread(true)
  }
  const getAvatarSrc = () => {
    if (data.fromData && data.type === 'user' && 'username' in data.fromData) {
      return data.fromData.avatar
    }
    // if (data.type === 'general' && data.from === 'admin') return '/admin.svg'
  }

  const dropDownItems = useMemo(() => {
    const nodes = [
      <DropdownItem onClick={() => markUnread(!data.isRead)} key="markUnread">
        Mark as {data.isRead ? 'unread' : 'read'}
      </DropdownItem>,
      <DropdownItem onClick={deleteNoti} key="delete">
        Delete this
      </DropdownItem>,
    ]

    if (data.type !== 'user' || data.action !== 'follow') {
      nodes.push(<DropdownItem key="turnOff">Turn off notifications for</DropdownItem>)
    }

    return nodes
  }, [data.action, data.isRead, data.type, deleteNoti, markUnread])

  return (
    <div className="relative">
      <Button
        as={Link}
        onClick={handleClick}
        href={data.href}
        variant="light"
        fullWidth
        className="relative h-fit rounded-xl px-6 py-10 transition-all"
      >
        <div className="flex w-full items-start font-light">
          <div className="flex h-full min-h-[110px] flex-shrink-0 flex-col items-center justify-between ">
            <Avatar src={getAvatarSrc() || '/gray.png'} className="flex-shrink-0" size="lg" />
            {!data.isRead && <div className="h-3 w-3 rounded-full bg-blue-600"></div>}
          </div>
          <div className={classNames('ml-8 min-w-0 flex-1 pr-6 text-left text-base', data.isRead && 'opacity-70')}>
            <b>{data.from}</b>
            <p className=" two-lines-ellipsis mt-1 whitespace-normal text-sm text-default-600">
              {data.action}. {moment(data.createdAt).format('DD MMM hh:mm')}
            </p>
            <p className="mt-2 whitespace-normal">&quot;{data.content}.&quot;</p>
          </div>
        </div>

        <div className="relative ml-2 h-28 w-28 flex-shrink-0 ">
          <Image
            width={144}
            height={144}
            src={IconMap[data.type]}
            className="absolute -top-1 z-10 aspect-square scale-[130%] object-cover object-center"
            alt="type_icon"
          />
        </div>
      </Button>

      <Dropdown>
        <DropdownTrigger>
          <Button
            onClick={(e) => e.stopPropagation()}
            className="absolute right-4 top-4 z-[11]"
            isIconOnly
            radius="full"
            variant="light"
          >
            <BiDotsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">{dropDownItems}</DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Notification
