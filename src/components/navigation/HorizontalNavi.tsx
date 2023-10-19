"use client";
import { Home } from "@/assets";
import { Menu, MenuProps } from "antd";
import React, { CSSProperties } from "react";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  className?: CSSProperties
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
    className,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "1"),
  getItem("Popular", "2"),
  { type: "divider", className: "bg-secondary-3" },
  getItem("Communities", "grp1", null, [
    getItem("Community 1", "3"),
    getItem("Community 2", "4"),
    getItem("Community 3", "5"),
  ]),
  { type: "divider", className: "bg-secondary-3" },
  getItem("Tags", "grp2", null, [
    getItem("Popular tag 1", "6"),
    getItem("Popular tag 2", "7"),
    getItem("Popular tag 3", "8"),
  ]),
];

export default function HorizontalNavi() {
    const {Item, Divider, ItemGroup, SubMenu} = Menu;
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("Item ", Item.t);
  };

  return (
    <div className="w-1/4 flex bg-dark-1 border border-transparent justify-end border-r-secondary-3">
      <Menu
        onClick={onClick}
        className="w-full bg-dark-1 py-5 pl-10 pr-5"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["grp1"]}
        mode="inline"
        items={items}
        theme="dark"
      />
    </div>
  );
}
