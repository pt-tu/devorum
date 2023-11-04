import React from "react";
import { ItemFooter } from "@/components";
import ReactButtons from "./ReactButtons";
import PostContent from "./PostContent";
import { Tags } from "./Tag";

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
          <Tags />
          {/* Footer */}
          <ItemFooter />
        </div>
      </div>
      <div className="border-t-[0.75px] my-4 border-gray-300" />
    </div>
  );
}

export default PostItem;
