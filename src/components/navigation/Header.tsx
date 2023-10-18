"use client";
import { Alarm, Chat, Communication, Home, Search } from "@/assets";
import React from "react";
import AppInput from "../common/AppInput";

export default function Header() {
  return (
    <div className="h-20 px-5 flex flex-1 flex-row bg-dark-2 items-center justify-between ">
      {/* Left */}
      <div className="flex flex-row gap-[10px] w-fit bg-secondary-3">
        <div className="h-[30px] w-[30px] bg-orange-8" />
      </div>

      {/* Middle */}
      <div className="flex flex-row items-center w-fit gap-5">
        <Home className="w-5 h-5" fill="#F4F6F8" />
        <Communication className="w-5 h-5" fill="#F4F6F8" />
        <AppInput
          placeholder="Type here to search..."
          rightIcon={<Search />}
          className="w-[440px]"
        />
      </div>

      {/* Right */}
      <div className="flex flex-row items-center w-fit gap-6">
        <div className="h-10 w-10 flex rounded-[7px] justify-center items-center bg-dark-4">
          <Chat />
        </div>
        <div className="h-10 w-10 flex rounded-[7px] justify-center items-center bg-dark-4">
          <Alarm />
        </div>
      </div>
    </div>
  );
}
