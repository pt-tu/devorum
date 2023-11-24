import { UpTriangle, DownTriangle } from "@/assets";
import React from "react";

function ReactButtons() {
  return (
    <div className="col-span-1 flex flex-col items-center">
      <div className="h-10 w-10 rounded-full border-[0.5px] flex justify-center items-center bg-[#F7F7F7] border-gray-3 hover:bg-dark-4">
        <UpTriangle />
      </div>
      <p className="py-2 font-bold text-lg text-gray-bg">1142</p>
      <div className="h-10 w-10 rounded-full border-[0.5px] flex justify-center items-center bg-[#F7F7F7] border-gray-3 hover:bg-dark-4">
        <DownTriangle />
      </div>
    </div>
  );
}

export default ReactButtons;
export type ReactProps = {
  reactNumber: number;
  reaction: (postId: string, type: string) => void;
};
