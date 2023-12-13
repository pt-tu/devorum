import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Textarea,
} from '@nextui-org/react'
import React from 'react'
import Comment from './Comment'

const CommentSection = () => {
  return (
    <div>
      <div className="mb-6 flex items-center">
        <h1 className="text-2xl font-medium">Comments</h1>
        <Dropdown>
          <DropdownTrigger>
            <p className="ml-auto text-sm font-light">Sorted by Recent</p>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="sort-recent">Sort recent</DropdownItem>
            <DropdownItem key="sort-relevant">Sort relevant</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
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
        <Comment reply={2} />
        <Divider />
        <Comment reply={1} />
      </div>
    </div>
  )
}

export default CommentSection
