"use client";
import { AppButton, TopicItem } from "@/components";
import Head from "next/head";
import React from "react";

const sample = [1, 1, 1, 1, 1, 1, 1, 1, 1];

export default function Page() {
  const time = {
    ask: "2 years, 6 months ago",
    modified: "8 months ago",
    viewed: "26k times",
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <main className="grid grid-cols-12 gap-5 relative flex-col items-center justify-between h-full px-10">
          <p className="text-gray-bg">main</p>
        </main>
      </Head>
      <div className="col-span-7 col-start-3 flex flex-col h-full">
        {/* Question */}
        <div className="flex flex-row justify-center mb-7">
          <p className="text-gray-bg font-normal text-3xl flex-1">
            Top Questions
          </p>
          <AppButton title="Post" onClick={() => console.log("Click")} />
        </div>

        <div className="border-t-[0.75px] my-5 border-gray-300" />
        {sample.map((item, index) => (
          <TopicItem key={index} />
        ))}
      </div>
    </>
  );
}
