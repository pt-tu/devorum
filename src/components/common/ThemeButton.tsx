"use client";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const changeTheme = (theme: string) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  if (!mounted) return null;
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
