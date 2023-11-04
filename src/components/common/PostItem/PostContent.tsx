"use client";
import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

function PostContent() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="col-span-full">
      {isEdit ? (
        <MDEditor value={value} onChange={(e) => setValue(e || "")} />
      ) : (
        <Markdown source={value} />
      )}
      {/* <EditerMarkdown source={value} /> */}
    </div>
  );
}

export default PostContent;
