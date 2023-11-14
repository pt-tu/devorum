"use client";
import React from "react";
import TagButton, { TagProps } from "./TagButton";

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
          <TagButton link={link} label={label} key={index} />
        ))}
      </div>
    )
  );
}

export default Tags;
