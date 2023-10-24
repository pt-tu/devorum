"use client";
import { Home } from "@/assets";
import React, { CSSProperties } from "react";
import { ItemNav } from "..";
import { useAppSelector } from "@/store";
import { selectMenuState } from "@/store/menuSlice";

export default function HorizontalNav() {
  const menuState = useAppSelector(selectMenuState);
  return (
    <div className="w-1/4 flex bg-dark-1 justify-end">
      {menuState.items.map((item) => (
        <ItemNav />
      ))}
    </div>
  );
}
