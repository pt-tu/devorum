"use client";
import {
  Alarm,
  Chat,
  Communication,
  DropDownArrow,
  Home,
  Logo,
  Search,
} from "@/assets";
import React from "react";
import AppInput from "../common/AppInput";

export default function Header() {
  return (
    <div className="h-20 px-5 flex flex-1 flex-row bg-dark-2 items-center justify-between ">
      {/* Left */}
      <div className="flex flex-row gap-[10px] w-1/3 justify-between items-center pr-7">
        <Logo width={30} height={30} />

        <div className="flex flex-row items-center w-fit gap-5">
          <Home className="w-5 h-5" fill="#F4F6F8" />
          <Communication className="w-5 h-5" fill="#F4F6F8" />
        </div>
      </div>

      {/* Middle */}
      <AppInput
        placeholder="Type here to search..."
        rightIcon={<Search />}
        className="w-1/4"
      />

      {/* Right */}
      <div className="flex flex-row items-center w-1/3 gap-6 justify-center">
        <div className="h-10 w-10 flex rounded-[7px] justify-center items-center bg-dark-4">
          <Chat />
        </div>
        <div className="h-10 w-10 flex rounded-[7px] justify-center items-center bg-dark-4">
          <Alarm />
        </div>
        <div className="h-10 w-fit flex rounded-[7px] justify-center items-center">
          <div className="w-10 h-10 flex rounded-lg border border-yellow-8 justify-center items-center overflow-hidden mr-4">
            <img
              className="h-[34px] w-[34px] rounded-lg"
              alt="devorum_avt"
              src="data:image/jpeg;base64,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"
            />
          </div>
          <span className="text-secondary-bg text-base font-bold mr-[10px]">
            Thanh Tú
          </span>
          <DropDownArrow />
        </div>
      </div>
    </div>
  );
}
