import { DownTriangle, UpTriangle } from "@/assets";
import React from "react";
import Tag, { TagProps } from "./Tag";
import { ItemFooter } from "@/components";

function PostItem() {
  const tags: TagProps[] = [
    { link: "/", label: "tailwind-css" },
    { link: "/", label: "javascript" },
    { link: "/", label: "css" },
  ];
  return (
    <div>
      <div className="grid grid-cols-7 gap-5">
        {/* Group button */}
        <div className="col-span-1 flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-[0.5px] flex justify-center items-center bg-[#F7F7F7] border-gray-3 hover:bg-dark-4">
            <UpTriangle />
          </div>
          <p className="py-2 font-bold text-lg text-gray-bg">1142</p>
          <div className="h-10 w-10 rounded-full border-[0.5px] flex justify-center items-center bg-[#F7F7F7] border-gray-3 hover:bg-dark-4">
            <DownTriangle />
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col">
          PostItem
          {/* Tags slider */}
          <div className="flex flex-row gap-2 my-3">
            {tags.map(({link, label}, index) => (
              <Tag link={link} label={label} key={index } />
            ))}
          </div>
          {/* Footer */}
          <ItemFooter />
        </div>
      </div>
      <div className="border-t-[0.75px] my-4 border-gray-300" />
    </div>
  );
}

export default PostItem;
