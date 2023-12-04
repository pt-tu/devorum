'use client'
import { PostItem } from '@/components'
import { usePostStore } from '@/store/usePostStore'
import copyCurrentLink from '@/utils/copyCurrentLink'
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
} from '@nextui-org/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { FiEdit2 } from 'react-icons/fi'
import Link from 'next/link'

const Community = () => {
  const { community } = useParams()
  const { posts } = usePostStore()

  return (
    <>
      <div className="h-4"></div>
      <div className="relative">
        {/* Banner */}
        <div className="h-13 aspect-[9] w-full overflow-hidden rounded-xl bg-white">
          <Image
            width={1280}
            height={80}
            className="h-full w-full object-cover"
            src="https://styles.redditmedia.com/t5_2z6zi/styles/bannerBackgroundImage_m4132q7zebq41.png"
            alt="community_banner"
          />
        </div>
        <div className="absolute left-4 top-1/2 flex h-[84px] w-[84px] translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-dark-1 p-1">
          <Image
            alt="community_icon"
            src="https://styles.redditmedia.com/t5_2z6zi/styles/communityIcon_cfjidmbwebq41.png"
            height={80}
            width={80}
            className="h-full w-full rounded-full"
          />
        </div>
      </div>

      {/* Name */}
      <div className="flex items-end justify-between">
        <h1 className="ml-28 mt-4 text-3xl font-semibold">{community}</h1>

        <div className="flex items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="bordered">
                <BsThreeDots />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="mute">Mute community</DropdownItem>
              <DropdownItem key="share" onClick={copyCurrentLink}>
                Share link
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button isIconOnly variant="bordered">
            <IoIosNotifications className="text-xl" />
          </Button>
          <Button color="primary">
            <p className="text-base">Join</p>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="small-scrollbar sticky top-20 col-span-3 h-full max-h-[calc(100vh-80px)] space-y-4 self-start overflow-auto">
          <div />
          <Button color="primary">
            <p className="text-base">Create Post</p>
          </Button>
          <div className="space-y-4 rounded-xl bg-dark-2 p-4">
            <div>
              <h2 className="font-medium">The Swift Programming Language</h2>
              <p className="mt-2 text-sm font-light">
                Swift is a general-purpose programming language built using a modern approach to safety, performance,
                and software design patterns.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium">109k</p>
                <p className="text-sm font-light">Members</p>
              </div>
              <div>
                <p className="font-medium">84144</p>
                <p className="text-sm font-light">Posts published</p>
              </div>
            </div>

            <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />

            <div>
              <h2 className="font-medium">User role/title</h2>
              <div className="group mt-2 flex items-center justify-between transition">
                <div className="flex items-center gap-4 text-sm font-light">
                  <Avatar size="lg" src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />
                  tuan-hda
                </div>
                <Button className="opacity-0 transition group-hover:opacity-100" variant="light" isIconOnly>
                  <FiEdit2 />
                </Button>
              </div>
            </div>

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

            <Divider className="-ml-4 mt-4 w-[calc(100%+32px)]" />
            <div>
              <h2 className="font-medium">Moderators</h2>
              <ul className="mt-2 grid grid-cols-4 text-sm font-light">
                <Link href="#">
                  <Avatar
                    size="lg"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--Iv24f4-g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/18254/c3e65d32-bfe2-48ed-93b3-f2caf9c60dd7.png"
                    alt="mod_avatar"
                  />
                </Link>

                <Link href="#">
                  <Avatar
                    size="lg"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--Iv24f4-g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/18254/c3e65d32-bfe2-48ed-93b3-f2caf9c60dd7.png"
                    alt="mod_avatar"
                  />
                </Link>

                <Link href="#">
                  <Avatar
                    size="lg"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--Iv24f4-g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/18254/c3e65d32-bfe2-48ed-93b3-f2caf9c60dd7.png"
                    alt="mod_avatar"
                  />
                </Link>

                <Link href="#">
                  <Avatar
                    size="lg"
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--Iv24f4-g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/18254/c3e65d32-bfe2-48ed-93b3-f2caf9c60dd7.png"
                    alt="mod_avatar"
                  />
                </Link>
              </ul>
            </div>
          </div>
          <div className="h-4" />
        </div>

        <div className="col-span-9 mt-4">
          <Tabs aria-label="Options" size="lg">
            <Tab key="Hot" title="Hot">
              {posts.slice(0, 10).map((item) => (
                <PostItem {...item} key={item.postId} />
              ))}
            </Tab>
            <Tab key="New" title="New">
              {posts.slice(1, 3).map((item) => (
                <PostItem {...item} key={item.postId} />
              ))}
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Community
