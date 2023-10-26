import { NavItemProps, NavMenuProps } from "@/types/navType";
import { StateCreator } from "zustand";

function getItem(
  key: React.Key,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  icon?: React.ReactNode,
  children?: NavItemProps[],
  expand:boolean = true,
): NavItemProps {
  return {
    key,
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
  getItem("grp2", "Popular Tags", null, null, [
    getItem("7", "#javascript", "82,645 Posted by this tag"),
    getItem("8", "#design", "51,354 • Trending in Bangladesh"),
    getItem("9", "#tutorial", "51,354 • Trending in Bangladesh"),
    getItem("7", "#javascript", "82,645 Posted by this tag"),
    getItem("8", "#design", "51,354 • Trending in Bangladesh"),
    getItem("9", "#tutorial", "51,354 • Trending in Bangladesh"),
    getItem("7", "#javascript", "82,645 Posted by this tag"),
    getItem("8", "#design", "51,354 • Trending in Bangladesh"),
    getItem("9", "#tutorial", "51,354 • Trending in Bangladesh"),
  ], false),
  getItem("grp2", "Popular Tags", null, null, [
    getItem("7", "#javascript", "82,645 Posted by this tag"),
    getItem("8", "#design", "51,354 • Trending in Bangladesh"),
    getItem("9", "#tutorial", "51,354 • Trending in Bangladesh"),
  ]),
];

export const createMenuSlice: StateCreator<NavMenuProps> = (set, get) => ({
  items: SAMPLE_MENU,
  defaultSelectedKeys: ["1"],
  defaultOpenKeys: [],
  onItemClick(key){

  },
  onExpand(key){
    set(state=>({
      items:state.items.map((item)=>
      item.key === key ? {...item, expand:!item.expand}:item)
    }))
  },
});
