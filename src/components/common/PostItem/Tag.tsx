import Link from "next/link";
import React from "react";

function Tag({ link, label }: TagProps) {
  return (
    <Link href={link} className="px-[6px] py-1 bg-blue-bg rounded-md w-fit">
      <p className="whitespace-nowrap font-thin text-xs text-blue-8">{label}</p>
    </Link>
  );
}

export default Tag;
export interface TagProps {
  link: string;
  label: string;
}
