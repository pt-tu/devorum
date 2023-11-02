import { DownTriangle, UpTriangle } from "@/assets";
import React from "react";

function PostItem() {
  return (
    <div>
      <div className="flex flex-row">
        {/* Group button */}
        <div className="mr-4 flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-[0.5px] flex justify-center items-center bg-[#F7F7F7] border-gray-3 hover:bg-dark-4">
            <UpTriangle />
          </div>
          <p className="py-2 font-bold text-lg text-gray-bg">1142</p>
          <div className="h-10 w-10 rounded-full border-[0.5px] flex justify-center items-center bg-[#F7F7F7] border-gray-3 hover:bg-dark-4">
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
