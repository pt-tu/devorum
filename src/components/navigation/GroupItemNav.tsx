import { NavItemProps } from "@/types/navType";
import React from "react";
import { ItemNav } from "..";
import { DownArrow, UpArrow } from "@/assets";

export default function GroupItemNav(items: NavItemProps) {
  return (
    <div className="p-3 pr-4 rounded-2xl bg-dark-2 gap-y-3">
      {items.title && (
        <div className="flex flex-row items-center">
          <p className="font-semibold text-base text-gray-bg ml-2 my-2 flex flex-1">
            {items.title}
          </p>
          {items.expand ? (
            <UpArrow fill="#F7F7F7" width={24} height={24} />
          ) : (
            <DownArrow fill="#F7F7F7" width={24} height={24} />
          )}
        </div>
      )}
      {items.expand && items.children?.map((item) => <ItemNav {...item} />)}
    </div>
  );
}
