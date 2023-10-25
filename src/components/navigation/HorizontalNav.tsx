"use client";
import React from "react";
import { useMenuStore } from "@/store/store";
import GroupItemNav from "./GroupItemNav";

export default function HorizontalNav() {
  const menuState = useMenuStore((state) => state);
  return (
    <div className="col-span-2 bg-dark-1 h-full relative overflow-hidden">
      <div className="flex flex-col gap-y-5 h-full absolute top-0 left-0 overflow-y-scroll -right-[17px]">
        {menuState.items.map((item) => (
          <GroupItemNav {...item} />
        ))}
      </div>
    </div>
  );
}
