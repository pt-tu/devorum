import React from 'react'
import ReactButtons from './ReactButtons'
import CommentContent from './CommentContent'
import { Tags } from './Tag'
import CommentFooter from './CommentFooter'
import Divider from '../Divider'

const tags = [
  { link: '/', label: 'tailwind-css' },
  { link: '/', label: 'javascript' },
  { link: '/', label: 'css' },
]

function CommentItem() {
  return (
    <div>
      <div className="grid grid-cols-7 gap-5">
        {/* Group button */}
        <ReactButtons />
        {/* Content */}
        <div className="col-span-6 flex flex-col">
          <CommentContent />
          {/* Tags slider */}
          {/* <Tags tags={tags} /> */}
          {/* Footer */}
          <CommentFooter />
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default CommentItem
