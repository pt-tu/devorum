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
  increaseVote: (id: string) => void
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
        // getPosts: async () => {
        //   try {
        //     const response = await listPostService(1, 1)
        //     set((state) => {
        //       const { posts, currentPage, totalPages, totalItems } = response.data
        //       state.posts = state.posts.concat(posts)
        //       state.currentPage = currentPage
        //       state.totalPages = totalPages
        //       state.totalItems = totalItems
        //     })
        //   } catch (error) {
        //     console.log('Get posts:', error)
        //   }
        // },
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
