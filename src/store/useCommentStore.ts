import { ReactProps } from '@/components/common/CommentItem/ReactButtons'
import { TagProps } from '@/components/common/CommentItem/Tag/TagButton'
import { ReactNode } from 'react'
import { create } from 'zustand'


interface CommentState {
  id: string
  content: string
  isEditing: boolean
  tags?: TagProps[]
  react: {
    votes: number
    
  }
  comment: string[]
  children?: CommentState[]
}

interface commentActions{

}

// export const useMenuStore = create<MenuState>()((set) => ({
//   items: SAMPLE_MENU,
//   toggleExpand: (id) => set((state) => ({
//     items: state.items.map((item)=>item.id === id ? ({...item, expand:!item.expand}) : item)
//   })),
// }));