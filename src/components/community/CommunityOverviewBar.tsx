import useUserTitlesData from '@/hooks/useUserTitlesData'
import { useUserStore } from '@/store/useUserStore'
import { Community } from '@/types/community.type'
import { Avatar, Button, Chip, Divider, Link, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import EditTitle from './EditTitle'

type Props = {
  data: Community
}

const CommunityOverviewBar = ({ data }: Props) => {
  const user = useUserStore((state) => state.user)
  const [showEditTitle, setShowEditTitle] = useState(false)

  const editTitleHandler = () => {
    setShowEditTitle((prev) => !prev)
  }

  return (
    <div className="small-scrollbar sticky top-20 col-span-3 h-full max-h-[calc(100vh-80px)] space-y-4 self-start overflow-y-auto pr-4">
      <div />
      {user && (
        <Button color="primary">
          <p className="text-base">Create Post</p>
        </Button>
      )}
      <div className="space-y-4 rounded-xl bg-dark-2 p-4">
        {(data.title || data.description) && (
          <div>
            {data.title && <h2 className="font-medium">{data.title}</h2>}
            {data.description && <p className="mt-2 text-sm font-light">{data.description}</p>}
          </div>
        )}
        <div className="flex items-center gap-4">
          <div>
            <p className="font-medium">{data.numMembers}</p>
            <p className="text-sm font-light">Members</p>
          </div>
          <div>
            <p className="font-medium">{data.numPosts}</p>
            <p className="text-sm font-light">Posts published</p>
          </div>
        </div>

        {user && (
          <>
            <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />

            <div>
              <h2 className="font-medium">User role/title</h2>
              <div className="group mt-2 flex items-center justify-between transition">
                <div className="flex items-center gap-4 text-sm font-light">
                  <Avatar size="lg" src={user?.avatar ?? '/gray.png'} />
                  <div>
                    {data.joinedStatus?.title && (
                      <Chip
                        size="sm"
                        style={{
                          backgroundColor: data.joinedStatus?.title?.backgroundColor,
                          color: data.joinedStatus.title.textColor,
                        }}
                      >
                        {data.joinedStatus?.title?.name}
                      </Chip>
                    )}
                    <p>{user?.username}</p>
                  </div>
                </div>
                {data.allowAligningTitle && (
                  <Button
                    onClick={editTitleHandler}
                    className="opacity-0 transition group-hover:opacity-100"
                    variant="light"
                    isIconOnly
                  >
                    <FiEdit2 />
                  </Button>
                )}
              </div>
              {showEditTitle && <EditTitle community={data.name} onClose={() => setShowEditTitle(false)} />}
            </div>
          </>
        )}

        {Array.isArray(data.rules) && data.rules.length > 0 && (
          <>
            <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />
            <div>
              <h2 className="font-medium">Rules</h2>
              <ul className="mt-2 text-sm font-light">
                {data.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {Array.isArray(data.resources) && data.resources.length > 0 && (
          <>
            <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />
            <div>
              <h2 className="font-medium">Resources</h2>
              <ul className="mt-2 space-y-3 text-sm font-light">
                {data.resources.map((resource, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant="flat"
                    radius="full"
                    as={Link}
                    href={resource.split('](')[1].replace(')', '') || '#'}
                    target="_blank"
                  >
                    {resource.split('](')[0].replace('[', '')}
                  </Button>
                ))}
              </ul>
            </div>
          </>
        )}

        <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />
        <div>
          <h2 className="font-medium">Moderators</h2>
          <ul className="mt-2 grid grid-cols-4 text-sm font-light">
            {Array.isArray(data.moderators) &&
              data.moderators.map((mod) => (
                <Tooltip content={mod.username} key={mod._id}>
                  <Link key={mod._id} href={`/p/${mod.username}`}>
                    <Avatar size="lg" src={mod.avatar ?? '/gray.png'} alt="mod_avatar" />
                  </Link>
                </Tooltip>
              ))}
          </ul>
        </div>
      </div>
      <div className="h-4" />
    </div>
  )
}

export default CommunityOverviewBar
