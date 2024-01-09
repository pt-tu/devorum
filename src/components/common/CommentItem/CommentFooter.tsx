import React from 'react'
import Author from './Author'

const authors = [1, 1]
function CommentFooter() {
  return (
    <div>
      <div className="my-4 flex flex-row gap-3">
        <p className="text-sm font-medium text-gray-500">Share</p>
        <p className="text-sm font-medium text-gray-500">Edit</p>
        <p className="text-sm font-medium text-gray-500">Follow</p>
        <div className="flex flex-1 flex-row-reverse">
          {authors.map((item, index) => (
            <Author key={index} />
          ))}
        </div>
      </div>
      <p className="font-medium text-gray-400">Add a comment</p>
    </div>
  )
}

export default CommentFooter
