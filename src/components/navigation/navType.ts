import React, { Key, ReactNode } from "react";

export type NavItemProps = {
  key: Key;
  label: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  path: string;
  expand: boolean;
};
export type NavMenuProps = {
  items: NavItemProps[];
  defaultSelectedKeys: Key[];
  defaultOpenKeys: Key[];
};
