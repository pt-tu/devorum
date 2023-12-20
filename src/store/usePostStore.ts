import { listPostService } from '@/services/postSevice'
import { Post } from '@/types/post.type'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface PostState {
  posts: Post[]
  currentPage: number
  totalPages: number
  totalItems: number
  selectedPost: Post | undefined
}

interface PostActions {
  // getPosts: () => Promise<void>
  setIsEditing: (id: string) => void
  setSelectedPost: (id: string) => void
  toggleVote: (post_id: string, votes: string[]) => void
  updatePost: (payload: Post) => void
  setPosts: (posts: Post[]) => void
}

export const usePostStore = createWithEqualityFn<PostState & PostActions>()(
  immer(
    persist(
      (set) => ({
        posts: [],
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
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
        toggleVote: (post_id, votes) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === post_id)
            if (postIndex !== -1 && votes) state.posts[postIndex].votes = votes
          })
        },
        updatePost: (payload) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === payload._id)
            if (postIndex !== -1) state.posts[postIndex] = { ...payload, user: state.posts[postIndex].user }
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
