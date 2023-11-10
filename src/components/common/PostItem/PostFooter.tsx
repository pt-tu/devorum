import React from "react";
import Author from "./Author";

const authors = [1, 1];
function PostFooter() {
  return (
    <div>
      <div className="flex flex-row gap-3 my-4">
        <p className="text-gray-500 text-sm font-medium">Share</p>
        <p className="text-gray-500 text-sm font-medium">Edit</p>
        <p className="text-gray-500 text-sm font-medium">Follow</p>
        <div className="flex flex-row-reverse flex-1">
          {authors.map((item) => (
            <Author />
          ))}
        </div>
      </div>
      <p className="text-gray-400 font-medium">Add a comment</p>
    </div>
  );
}

export default PostFooter;
