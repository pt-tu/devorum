import React from "react";
import { ItemNav } from "..";
import { DownArrow, UpArrow } from "@/assets";
import { NavItemProps, useMenuStore } from "@/store/useMenuStore";

export default function GroupItemNav(items: NavItemProps) {
  const { toggleExpand } = useMenuStore();

  return (
    <div className="p-3 pr-4 rounded-2xl bg-dark-2 gap-y-3">
      {items.title && (
        <div className="flex flex-row items-center">
          <p className="font-semibold text-base text-gray-bg ml-2 my-2 flex flex-1 pointer-events-none">
            {items.title}
          </p>
          <div onClick={() => toggleExpand(items.id)}>
            {items.expand ? (
              <UpArrow
                fill={"rgb(var(--color-gray-bg)"}
                width={24}
                height={24}
              />
            ) : (
              <DownArrow
                fill={"rgb(var(--color-gray-bg)"}
                width={24}
                height={24}
              />
            )}
          </div>
        </div>
      )}
      {items.expand &&
        items.children?.map((item) => <ItemNav {...item} key={item.id} />)}
    </div>
  );
}
