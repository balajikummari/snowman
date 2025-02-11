import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { themes } from 'src/config/themes'
import { useTheme } from 'next-themes'
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme == 'system') setTheme('technovert')
  }, [])

  const handleChange = () => {
    theme == 'dracula' ? setTheme('technovert') : setTheme('dracula')
  }
  return (
    <div className="flex items-center justify-end">
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => handleChange()}
      >
        {theme == 'dracula' ? (
          <svg
            className="h-8 w-8 md:h-10 md:w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="h-8 w-8 md:h-10 md:w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
export default ThemeSwitcher
