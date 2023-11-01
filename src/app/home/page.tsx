import { PostItem } from "@/components";
import React from "react";

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1];

export default function Page() {
  return (
    <div className="col-span-7 flex flex-col gap">
      {sample.map((item, index) => (
        <PostItem key={index} />
      ))}
    </div>
  );
}
