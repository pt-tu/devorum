import { ReactProps } from "@/components/common/PostItem/ReactButtons";
import { TagProps } from "@/components/common/PostItem/Tag/TagButton";
import { ReactNode } from "react";
import { create } from "zustand";

// export const useMenuStore = create<MenuState>()((set) => ({
//   items: SAMPLE_MENU,
//   toggleExpand: (id) => set((state) => ({
//     items: state.items.map((item)=>item.id === id ? ({...item, expand:!item.expand}) : item)
//   })),
// }));

interface PostState {
  postId: string;
  replyFor?: string;
  isEditing: boolean;
  react: ReactProps;
  content: string;
  comment: string[];
  tags?: TagProps[];
  children?: PostState[];
}
