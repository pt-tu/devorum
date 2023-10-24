import React from "react";

export default function ItemNav() {
  return (
    <div className="flex w-full h-fit hover:bg-dark-4 pl-2 py-2 flex-row gap-2 items-center">
      <div className="h-8 w-8 bg-orange-8 rounded-md" />
      <div className="justify-between">
        <p className="text-xs font-semibold text-gray-bg">Newest and Recent</p>
        <p className="text-gray-3 text-[9px] font-normal">
          Find the latest update
        </p>
      </div>
    </div>
  );
}
