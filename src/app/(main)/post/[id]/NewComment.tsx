import useListCommentsData from '@/hooks/useListCommentsData'
import { createCommentService } from '@/services/commentService'
import { useUserStore } from '@/store/useUserStore'
import { Comment } from '@/types/comment.type'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Textarea } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
  replyingTo?: Comment
  setReplyingTo?: (comment?: Comment) => void
}

const NewComment = ({ replyingTo, setReplyingTo }: Props) => {
  const user = useUserStore((state) => state.user)
  const { id } = useParams()
  const { mutate } = useListCommentsData(id as string)
  const [value, setValue] = useState('')

  const createComment = async () => {
    try {
      if (replyingTo)
        await createCommentService({
          content: value.trim(),
          postId: id as string,
          replyTo: replyingTo._id,
        })
      else
        await createCommentService({
          content: value.trim(),
          postId: id as string,
        })
      mutate()
      setReplyingTo && setReplyingTo(undefined)

      setValue('')
    } catch (error) {
      console.log('Create comment error:', error)
    }
  }

  if (!user) return null
  return (
    <Card className="p-6">
      <CardHeader className="flex w-full items-center space-x-4">
        <Avatar src={user.avatar || '/gray.png'} />
        <p>{user?.username}</p>
        {replyingTo && <p className="ml-auto flex-1 pr-4 text-right font-light">Replying to {replyingTo.author}</p>}
      </CardHeader>
      <CardBody>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="lg"
          className="remove-border -mx-3 -mt-1 font-light"
          variant="bordered"
        />
      </CardBody>
      <CardFooter className="-mb-4 flex items-center justify-end gap-4">
        {setReplyingTo && (
          <Button onClick={() => setReplyingTo(undefined)} size="lg" variant="light" color="danger">
            Close
          </Button>
        )}
        <Button onClick={createComment} size="lg" variant="light" color="primary">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NewComment
