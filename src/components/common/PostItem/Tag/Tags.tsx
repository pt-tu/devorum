"use client";
import React from "react";
import Tag, { TagProps } from "./Tag";

const tags: TagProps[] = [
  { link: "/", label: "tailwind-css" },
  { link: "/", label: "javascript" },
  { link: "/", label: "css" },
];
// interface Props {
//   tags: TagProps[];
// }

function Tags() {
  //   const { tags } = props;
  return (
    tags.length && (
      <div className="flex flex-row gap-2 my-3">
        {tags.map(({ link, label }, index) => (
          <Tag link={link} label={label} key={index} />
        ))}
      </div>
    )
  );
}

export default Tags;
