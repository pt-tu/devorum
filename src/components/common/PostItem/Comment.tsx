import { Divider } from "@/components";
import React from "react";
import { Markdown } from "../Markdown";

const comment =
  "Thank you, kissu. Works like a charm. Hadn't looked at this part of the tailwind docs. Is there any relationship between tailwind's `@apply` and the abandoned CSS `@apply` feature?";

function Comment() {
  return (
    <div>
      <Divider />
      <Markdown
        source={comment}
        className="text-gray-bg font-thin inline-block"
        style={{ fontSize: 12 }}
      />
    </div>
  );
}

export default Comment;
export type CommentProps = {
  id: string;
  comment: string;
  author: string;
  datetime: string;
};
