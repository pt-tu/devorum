import { create } from "zustand";

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));

interface ThemeState {
  theme: string;
  toggleTheme: () => void;
}
