import { ReactNode } from "react";
import { create } from "zustand";

function getItem(
  id: string,
  title?: ReactNode,
  subTitle?: ReactNode,
  icon?: ReactNode,
  children?: NavItemProps[],
  expand: boolean = true
): NavItemProps {
  return {
    id,
    title,
    subTitle,
    icon,
    children,
    path: "/",
    expand,
  } as NavItemProps;
}
const SAMPLE_MENU = [
  getItem("grp0", null, null, null, [
    getItem("1", "Home", "Find the latest update"),
    getItem("2", "Popular", "Shots featured today by curators"),
    getItem("3", "Following", "Explore from your favorite person"),
  ]),
  getItem("grp1", "Communities", null, null, [
    getItem("4", "#javascript", "82,645 Posted by this tag"),
    getItem("5", "#design", "51,354 • Trending in Bangladesh"),
    getItem("6", "#tutorial", "51,354 • Trending in Bangladesh"),
  ]),
  getItem(
    "grp2",
    "Popular Tags",
    null,
    null,
    [
      getItem("7", "#javascript", "82,645 Posted by this tag"),
      getItem("8", "#design", "51,354 • Trending in Bangladesh"),
      getItem("9", "#tutorial", "51,354 • Trending in Bangladesh"),
      getItem("10", "#javascript", "82,645 Posted by this tag"),
      getItem("11", "#design", "51,354 • Trending in Bangladesh"),
      getItem("12", "#tutorial", "51,354 • Trending in Bangladesh"),
      getItem("13", "#javascript", "82,645 Posted by this tag"),
      getItem("14", "#design", "51,354 • Trending in Bangladesh"),
      getItem("15", "#tutorial", "51,354 • Trending in Bangladesh"),
    ],
    false
  ),
];

export const useMenuStore = create<MenuState>()((set) => ({
  items: SAMPLE_MENU,
  toggleExpand: (id) => set((state) => ({
    items: state.items.map((item)=>item.id === id ? ({...item, expand:!item.expand}) : item) 
  })),
}));

export type NavItemProps = {
  id: string;
  title: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  children?: NavItemProps[];
  path: string;
  expand: boolean;
};
interface MenuState {
  items: NavItemProps[];
  toggleExpand: (id: string) => void;
}
