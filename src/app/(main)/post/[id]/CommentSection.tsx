import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Textarea } from '@nextui-org/react'
import React from 'react'
import Comment from './Comment'

const CommentSection = () => {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-medium">Comments</h1>
      <Card className="p-6">
        <CardHeader className="space-x-4">
          <Avatar src="/gray.png" />
          <p>tuan-hda</p>
        </CardHeader>
        <CardBody>
          <Textarea size="lg" className="remove-border -mx-3 -mt-1 font-light" variant="bordered" />
        </CardBody>
        <CardFooter className="-mb-4">
          <Button className="ml-auto" size="lg" variant="light" color="primary">
            Submit
          </Button>
        </CardFooter>
      </Card>

      <div className="h-6" />

      <div className="mt-6 space-y-6">
        <Comment />
      </div>
    </div>
  )
}

export default CommentSection
