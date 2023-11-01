import { DownTriangle, UpTriangle } from "@/assets";
import React from "react";

function PostItem() {
  return (
    <div>
      <div className="flex flex-row">
        {/* Group button */}
        <div className="mr-4 flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-1 flex justify-center items-center bg-gray-bg">
            <UpTriangle />
          </div>
          <p className="py-2 font-bold text-lg">1142</p>
          <div className="h-10 w-10 rounded-full border-1 flex justify-center items-center bg-gray-bg">
            <DownTriangle />
          </div>
        </div>
        {/* Content */}
        <div>PostItem</div>
      </div>
      <div className="border-t-[0.5px] my-4 border-gray-6" />
    </div>
  );
}

export default PostItem;
