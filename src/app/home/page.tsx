import { PostItem } from "@/components";
import React from "react";

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1];

export default function Page() {
  return (
    <div className="col-span-7 col-start-3 flex flex-col">
      {sample.map((item, index) => (
        <PostItem key={index} />
      ))}
    </div>
  );
}
