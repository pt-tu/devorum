import { useUserStore } from '@/store/useUserStore'
import { Community } from '@/types/community.type'
import { Avatar, Button, Divider, Link } from '@nextui-org/react'
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'

type Props = {
  data: Community
}

const CommunityOverviewBar = ({ data }: Props) => {
  const user = useUserStore((state) => state.user)

  return (
    <div className="small-scrollbar sticky top-20 col-span-3 h-full max-h-[calc(100vh-80px)] space-y-4 self-start overflow-auto pr-4">
      <div />
      {user && (
        <Button color="primary">
          <p className="text-base">Create Post</p>
        </Button>
      )}
      <div className="space-y-4 rounded-xl bg-dark-2 p-4">
        {(data.title || data.description) && (
          <div>
            {data.title && <h2 className="font-medium">The Swift Programming Language</h2>}
            {data.description && (
              <p className="mt-2 text-sm font-light">
                Swift is a general-purpose programming language built using a modern approach to safety, performance,
                and software design patterns.
              </p>
            )}
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
                  {user?.username}
                </div>
                <Button className="opacity-0 transition group-hover:opacity-100" variant="light" isIconOnly>
                  <FiEdit2 />
                </Button>
              </div>
            </div>
          </>
        )}

        {Array.isArray(data.rules) && data.rules.length > 0 && (
          <>
            <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />
            <div>
              <h2 className="font-medium">Rules</h2>
              <ul className="mt-2 text-sm font-light">
                <li>Be nice.</li>
                <li>Be respectful.</li>
                <li>Assume best intentions.</li>
                <li>Be kind, rewind.</li>
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
                <Button fullWidth variant="flat" radius="full" as={Link} href="#">
                  Official website
                </Button>
                <Button fullWidth variant="flat" radius="full" as={Link} href="#">
                  Swift Docs
                </Button>
                <Button fullWidth variant="flat" radius="full" as={Link} href="#">
                  Swift Book
                </Button>
              </ul>
            </div>
          </>
        )}

        <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />
        <div>
          <h2 className="font-medium">Moderators</h2>
          <ul className="mt-2 grid grid-cols-4 text-sm font-light">
            {data.moderators.map((mod) => (
              <Link key={mod} href="#">
                <Avatar
                  size="lg"
                  src="https://res.cloudinary.com/practicaldev/image/fetch/s--Iv24f4-g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/18254/c3e65d32-bfe2-48ed-93b3-f2caf9c60dd7.png"
                  alt="mod_avatar"
                />
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-4" />
    </div>
  )
}

export default CommunityOverviewBar
