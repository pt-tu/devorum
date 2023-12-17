'use client'

import { listPostService } from '@/services/postSevice'
import { usePostStore } from '@/store/usePostStore'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  // const { setPosts } = usePostStore()
  // const posts = await listPostService(1, 10)
  // setPosts(posts.data.posts)
  return (
    <NextUIProvider>
      <NextThemesProvider enableSystem={false} attribute="class">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
