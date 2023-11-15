import React from "react";
import TagButton, { TagProps } from "./TagButton";

interface Props {
  tags: TagProps[];
}

function Tags({ tags }: Props) {
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
