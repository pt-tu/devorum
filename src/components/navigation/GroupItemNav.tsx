import { NavItemProps } from "@/types/navType";
import React from "react";
import { ItemNav } from "..";

export default function GroupItemNav(items: NavItemProps) {
  return (
    <div className="p-3 pr-4 rounded-2xl bg-dark-2 gap-y-3">
      {items.title && (
        <p className="font-semibold text-base text-gray-bg ml-2 my-2">
          {items.title}
        </p>
      )}
      {items.expand && items.children?.map((item) => <ItemNav {...item} />)}
    </div>
  );
}
