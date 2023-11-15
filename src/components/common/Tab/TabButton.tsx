import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";

function TabButton({ icon, label, isSelected, onClick }: TabProps) {
  return (
    <div
      className={classNames(
        "flex flex-row px-[10px] py-[5px] rounded-full w-fit gap-[5px] text-xs items-center",
        isSelected
          ? "bg-blue-primary text-white"
          : "bg-gray-border text-gray-text"
      )}
      onClick={onClick}
    >
      {icon}
      <p className="whitespace-nowrap font-thin">{label}</p>
    </div>
  );
}

export default TabButton;
export interface TabProps {
  icon?: ReactNode;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}
