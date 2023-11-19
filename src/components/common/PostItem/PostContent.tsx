"use client";
import React from "react";
import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { MDEditor, Markdown } from "../Markdown";
import Comment from "./Comment";

function PostContent() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [isEdit, setIsEdit] = useState(true);
  const { theme } = useThemeStore();

  return (
    <div className="col-span-full">
      {isEdit ? (
        <MDEditor value={value} onChange={(e) => setValue(e || "")} />
      ) : (
        <Markdown source={value} />
      )}
      {/* <EditorMarkdown source={value} /> */}
    </div>
  );
}

export default PostContent;
