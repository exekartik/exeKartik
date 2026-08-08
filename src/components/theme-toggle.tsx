"use client"

import { useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import {
  AnimatedThemeToggler,
  type TransitionVariant,
} from "@/components/ui/animated-theme-toggler"

import { Tooltip, TooltipContent, TooltipTrigger } from "./base/ui/tooltip"
import { Kbd } from "./ui/kbd"

interface ThemeToggleProps {
  variant?: TransitionVariant
  duration?: number
}

export function ThemeToggle({
  variant = "circle",
  duration = 500,
}: ThemeToggleProps) {
  const togglerRef = useRef<HTMLButtonElement>(null)

  useHotkeys("d", () => {
    togglerRef.current?.click()
  })

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <AnimatedThemeToggler
            ref={togglerRef}
            id="theme-toggle-button"
            variant={variant}
            duration={duration}
            className="size-8 border-none bg-transparent hover:bg-muted"
          />
        }
      />
      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
