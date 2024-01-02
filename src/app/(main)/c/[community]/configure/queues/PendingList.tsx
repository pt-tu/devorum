import { PostItem } from '@/components'
import usePostsData from '@/hooks/usePostsData'
import { updatePostService } from '@/services/postSevice'
import { useThemeStore } from '@/store/useThemeStore'
import { Post } from '@/types/post.type'
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import classNames from 'classnames'
import { useParams } from 'next/navigation'
import React, { ChangeEvent, Fragment, useMemo, useState } from 'react'

const PendingList = () => {
  const { community } = useParams()
  const [current, setCurrent] = useState<Post>()
  const [searchPosts, setSearchPosts] = useState('')
  const { data, mutate } = usePostsData(1, 100, community as string, 'pending')
  const theme = useThemeStore((state) => state.theme)

  const filteredPostsData = useMemo(() => {
    if (!data) return []
    return data.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchPosts.toLowerCase()) ||
        post.content.toLowerCase().includes(searchPosts.toLowerCase())
      )
    })
  }, [data, searchPosts])

  console.log('data', data)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleClick =
    (post: Post): React.MouseEventHandler<HTMLDivElement> | undefined =>
    (e) => {
      setCurrent(post)
      onOpen()
      e.stopPropagation()
    }

  const handleClose = () => {
    onClose()
    setCurrent(undefined)
  }

  const handleAccept = async () => {
    try {
      if (current) {
        await updatePostService({ ...current, state: 'accepted' })
        mutate()
      }
    } catch (error) {
      console.log('Handle accept error', error)
    } finally {
      handleClose()
    }
  }

  const handleReject = async () => {
    try {
      if (current) {
        await updatePostService({ ...current, state: 'rejected' })
        mutate()
      }
    } catch (error) {
      console.log('Handle accept error', error)
    } finally {
      handleClose()
    }
  }

  return (
    <>
      <Input
        isClearable
        value={searchPosts}
        onChange={(e) => setSearchPosts(e.target.value)}
        onClear={() => setSearchPosts('')}
        size="lg"
        className="mb-6"
        placeholder="Search for post"
      />

      {filteredPostsData.length > 0 && (
        <div className="rounded-xl bg-dark-8 px-10 py-6">
          {filteredPostsData.map((post, idx) => (
            <Fragment key={post._id}>
              <div className="cursor-pointer" onClick={handleClick(post)}>
                <PostItem hideActions {...post} />
              </div>
              {idx !== filteredPostsData.length - 1 && <div className="mb-8 border-t border-t-gray-4/20" />}
            </Fragment>
          ))}
        </div>
      )}

      <Modal
        isDismissable={false}
        className="max-h-[80vh] max-w-[620px] overflow-y-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">{current?.title}</ModalHeader>
              <ModalBody className={classNames(theme === 'dark' && 'dark')}>
                <div
                  className="prose dark:prose-dark"
                  dangerouslySetInnerHTML={{ __html: current?.content || '' }}
                ></div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleReject} color="danger" variant="light">
                  Reject
                </Button>
                <Button onClick={handleAccept} color="primary" variant="light">
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default PendingList
