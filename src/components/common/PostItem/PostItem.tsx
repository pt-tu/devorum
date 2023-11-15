import React from "react";
import ReactButtons from "./ReactButtons";
import PostContent from "./PostContent";
import { Tags } from "./Tag";
import PostFooter from "./PostFooter";
import Divider from "../Divider";

const tags = [
  { link: "/", label: "tailwind-css" },
  { link: "/", label: "javascript" },
  { link: "/", label: "css" },
];

function PostItem() {
  return (
    <div>
      <div className="grid grid-cols-7 gap-5">
        {/* Group button */}
        <ReactButtons />
        {/* Content */}
        <div className="col-span-6 flex flex-col">
          <PostContent />
          {/* Tags slider */}
          <Tags tags={tags} />
          {/* Footer */}
          <PostFooter />
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default PostItem;
