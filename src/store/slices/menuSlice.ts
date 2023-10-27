import { NavItemProps, NavMenuProps } from "@/types/navType";
import { createSlice } from "@reduxjs/toolkit";
import { Key, ReactNode } from "react";
import { AppState } from "../store";

function getItem(
  key: Key,
  title?: ReactNode,
  subTitle?: ReactNode,
  icon?: ReactNode,
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

const initialState: NavMenuProps = {
  items: SAMPLE_MENU,
  defaultSelectedKeys: ["1"],
  defaultOpenKeys: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.menu,
  //     };
  //   },
  // },
});

export const {} = menuSlice.actions;
export const selectMenuState = (state: AppState) => state.menu;
export default menuSlice.reducer;
