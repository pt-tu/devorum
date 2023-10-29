"use client";
import React from "react";
import GroupItemNav from "./GroupItemNav";
import classNames from "classnames";
import { useMenuStore } from "@/store/useMenuStore";

interface Props {
  className?: classNames.Argument;
}

export default function HorizontalNav(props: Props) {
  const {className} = props;
  const {items} = useMenuStore();
  return (
    <div
      className={classNames(
        "col-span-2 bg-dark-1 h-full relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col gap-y-5 h-full absolute top-0 left-0 overflow-y-scroll -right-[17px]">
        {items.map((item) => (
          <GroupItemNav {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
