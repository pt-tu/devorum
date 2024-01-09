'use client'
import { useThemeStore } from '@/store/useThemeStore'
import { MoonIcon } from '@heroicons/react/24/outline'
import { SunIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
  size?: 'sm' | 'md' | 'lg'
}

function ThemeButton({ size = 'md' }: Props) {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  useEffect(() => {
    setMounted(true)
  }, [])

  const changeTheme = useCallback((theme: string) => {
    typeof document !== 'undefined' && document.querySelector('html')?.setAttribute('data-theme', theme)
    typeof document !== 'undefined' && document.querySelector('html')?.setAttribute('data-color-mode', theme)
  }, [])

  useEffect(() => {
    changeTheme(theme)
  }, [theme, changeTheme])

  if (!mounted) return <div className="h-5 w-5"></div>
  return (
    <Button size={size} radius="full" isIconOnly onClick={toggleTheme} variant="light">
      {theme === 'dark' ? <SunIcon className="h-5 w-5 text-orange-8" /> : <MoonIcon className="h-5 w-5 text-dark-0" />}
    </Button>
  )
}

export default ThemeButton
