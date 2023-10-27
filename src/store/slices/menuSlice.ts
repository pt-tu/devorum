import { NavItemProps, NavMenuProps } from "@/types/navType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Key, ReactNode } from "react";
import { AppState } from "../store";

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

const initialState: NavMenuProps = {
  items: SAMPLE_MENU,
  defaultSelectedKeys: ["1"],
  defaultOpenKeys: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    onExpand(state, action: PayloadAction<string>) {
      state.items.map((item, index) => {
        if (item.id === action.payload) {
          const prev = state.items[index].expand;
          state.items[index].expand = !prev;
        }
      });
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.menu,
  //     };
  //   },
  // },
});

export const { onExpand } = menuSlice.actions;
export const selectMenuState = (state: AppState) => state.menu;
export default menuSlice.reducer;
