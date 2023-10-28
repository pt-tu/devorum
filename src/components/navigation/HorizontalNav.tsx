"use client";
import React from "react";
import GroupItemNav from "./GroupItemNav";
import { useAppSelector } from "@/store";
import { selectMenuState } from "@/store/slices/menuSlice";
import classNames from "classnames";

interface Props {
  className?: classNames.Argument;
}

export default function HorizontalNav(props: Props) {
  const {className} = props;
  const menuState = useAppSelector(selectMenuState);
  return (
    <div
      className={classNames(
        "col-span-2 bg-dark-1 h-full relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col gap-y-5 h-full absolute top-0 left-0 overflow-y-scroll -right-[17px]">
        {menuState.items.map((item) => (
          <GroupItemNav {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
