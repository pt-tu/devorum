import { NavItemProps } from "@/types/navType";
import Link from "next/link";
import React from "react";

export default function ItemNav(item: NavItemProps) {
  return (
    <Link
      href={item.path}
      className="flex w-full h-fit hover:bg-dark-4 rounded-md pl-2 py-2 flex-row gap-2 items-center"
    >
      <div className="h-8 w-8 bg-orange-8 rounded-md" />
      <div className="justify-between">
        <p className="text-xs font-semibold text-gray-bg">{item.title}</p>
        <p className="text-gray-3 text-[9px] font-normal">{item.subTitle}</p>
      </div>
    </Link>
  );
}
