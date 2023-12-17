import { Post } from '@/types/post.type'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface PostState {
  posts: Post[]
  selectedPost: Post | undefined
}

interface PostActions {
  setIsEditing: (id: string) => void
  setSelectedPost: (id: string) => void
  increaseVote: (id: string) => void
  updatePost: (payload: Post) => void
  setPosts: (posts: Post[]) => void
}

export const usePostStore = createWithEqualityFn<PostState & PostActions>()(
  immer(
    persist(
      (set) => ({
        posts: [],
        selectedPost: undefined,
        setIsEditing: (id) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === id)
            if (postIndex !== -1) state.posts[postIndex].isEditing = !state.posts[postIndex].isEditing
          })
        },
        setSelectedPost: (id) => {
          set((state) => {
            const post = state.posts.find((item) => item._id === id)
            if (post) state.selectedPost = post
          })
        },
        increaseVote: (user_id) => {
          set((state) => {
            // const postIndex = state.posts.findIndex((item) => item._id === user_id)
            // if (postIndex !== -1) state.posts[postIndex].react.votes += 1
          })
        },
        updatePost: (payload) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === payload._id)
            if (postIndex !== -1) state.posts[postIndex] = payload
          })
        },
        setPosts: (posts) => {
          set((state) => {
            state.posts = posts
          })
        },
      }),
      {
        name: 'post-store',
      },
    ),
  ),
  shallow,
)
