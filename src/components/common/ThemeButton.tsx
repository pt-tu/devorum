import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import React from "react";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  console.log("🚀 ~ file: ThemeButton.tsx:8 ~ ThemeButton ~ theme:", theme);
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-bg"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-orange-8" />
      ) : (
        <MoonIcon className="h-5 w-5 text-dark-0" />
      )}
    </button>
  );
}

export default ThemeButton;
