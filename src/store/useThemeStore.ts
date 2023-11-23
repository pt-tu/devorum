import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'theme-store' },
  ),
)

interface ThemeState {
  theme: string
  toggleTheme: () => void
}
