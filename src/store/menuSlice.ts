import { NavItemProps, NavMenuProps } from "@/components/navigation/navType";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { HYDRATE } from "next-redux-wrapper";

function getItem(
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: NavItemProps[]
): NavItemProps {
  return {
    key,
    label,
    icon,
    children,
    path: "/home",
    expand: true,
  } as NavItemProps;
}
const SAMPLE_MENU = [
  getItem("1", "Home"),
  getItem("2", "Popular"),
  getItem("grp1", "Communities", null, [
    getItem("3", "Community 1"),
    getItem("4", "Community 2"),
    getItem("5", "Community 3"),
  ]),
  getItem("grp2", "Tags", null, [
    getItem("6", "Popular tag 1"),
    getItem("7", "Popular tag 2"),
    getItem("8", "Popular tag 3"),
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.menu,
      };
    },
  },
});

export const {} = menuSlice.actions;
export const selectMenuState = (state: AppState) => state.menu;
export default menuSlice.reducer;
