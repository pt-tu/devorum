import { createMenuSlice } from './slices/menuSlice';
import { NavMenuProps } from "@/types/navType";
import { create } from "zustand";

export const useMenuStore = create<NavMenuProps>()((...a)=>({
  ...createMenuSlice(...a)
}))