"use client";
import { AppButton, PostItem } from "@/components";
import React from "react";

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1];

export default function Page() {
  const time = {
    ask: "2 years, 6 months ago",
    modified: "8 months ago",
    viewed: "26k times",
  };

  return (
    <div className="col-span-7 col-start-3 flex flex-col">
      {/* Question */}
      <div className="flex flex-row flex-1 justify-center mb-2">
        <p className="text-gray-bg font-normal text-2xl flex-1">
          Can tailwind colors be referenced from CSS?
        </p>
        <AppButton title="Post" onClick={() => console.log("Click")} />
      </div>

      {/* Sub info */}
      <div className="flex flex-row gap-4">
        <p className="text-xs text-gray-500">
          Ask <span className="text-gray-bg">{time.ask}</span>
        </p>
        <p className="text-xs text-gray-500">
          Modified <span className="text-gray-bg">{time.modified}</span>
        </p>
        <p className="text-xs text-gray-500">
          Viewed <span className="text-gray-bg">{time.viewed}</span>
        </p>
      </div>
      <div className="border-t-[0.75px] my-4 border-gray-300" />
      {sample.map((item, index) => (
        <PostItem key={index} />
      ))}
    </div>
  );
}
