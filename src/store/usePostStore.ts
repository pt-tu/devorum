import { Post, PostUpdate } from '@/types/post.type'
import { User } from '@/types/user.type'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface PostState {
  posts: Post[]
  currentPage: number
  totalPages: number
  totalItems: number
  selected: Post | undefined
}

interface PostActions {
  // getPosts: () => Promise<void>
  setIsEditing: (id: string) => void
  setSelected: (id: string) => void
  initSelected: (user: User) => void
  updateSelected: (data: PostUpdate) => void
  toggleVote: (post_id: string, votes: string[]) => void
  addView: (post_id: string, views: string[]) => void
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
        selected: undefined,
        setIsEditing: (id) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === id)
            if (postIndex !== -1) state.posts[postIndex].isEditing = !state.posts[postIndex].isEditing
          })
        },
        setSelected: (id) => {
          set((state) => {
            const post = state.posts.find((item) => item._id === id)
            if (post) state.selected = post
          })
        },
        initSelected: (user) => {
          const initPost: Post = {
            _id: '-1',
            title: '',
            isEditing: true,
            tags: [],
            user,
          }
          set((state) => {
            state.selected = initPost
          })
        },
        updateSelected: ({ title, content, tags }) => {
          set((state) => {
            if (!state.selected) return
            if (title) state.selected.title = title
            if (content) state.selected.content = content
            if (tags) state.selected.tags = tags
          })
        },
        toggleVote: (post_id, votes) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === post_id)
            if (postIndex !== -1 && votes) state.posts[postIndex].votes = votes
          })
        },
        addView: (post_id, views) => {
          set((state) => {
            const postIndex = state.posts.findIndex((item) => item._id === post_id)
            if (postIndex !== -1 && views) state.posts[postIndex].views = views
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
