import React, { Key, ReactNode } from "react";

export type NavItemProps = {
  id: string;
  title: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  children?: NavItemProps[];
  path: string;
  expand: boolean;
};
export type NavMenuProps = {
  items: NavItemProps[];
  defaultSelectedKeys: Key[];
  defaultOpenKeys: Key[];
};
