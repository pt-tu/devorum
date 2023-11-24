'use client'
import { useThemeStore } from '@/store/useThemeStore'
import { MoonIcon } from '@heroicons/react/24/outline'
import { SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import React, { useCallback, useEffect, useState } from 'react'

function ThemeButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  useEffect(() => {
    setMounted(true)
  }, [])

  const changeTheme = useCallback((theme: string) => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
    document.querySelector('html')?.setAttribute('data-color-mode', theme)
  }, [])

  useEffect(() => {
    changeTheme(theme)
  }, [theme, changeTheme])

  if (!mounted) return null
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-bg"
      onClick={() => toggleTheme()}
    >
      {theme === 'dark' ? <SunIcon className="h-5 w-5 text-orange-8" /> : <MoonIcon className="h-5 w-5 text-dark-0" />}
    </button>
  )
}

export default ThemeButton
