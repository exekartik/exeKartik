"use client"

import { MoonIcon, SunMediumIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { Button } from "@/components/ui/button"

/** @internal */
import { ThemeToggleEffectSelector } from "./theme-toggle-effect-selector"

export default function ThemeToggleEffectDemo() {
  const { resolvedTheme, setTheme } = useTheme()

  const [click] = useClickSound()

  const switchTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleThemeToggleClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    click()
    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    const hasCustomEffect = !!document.getElementById(
      "theme-toggle-effect-demo-style"
    )
    if (hasCustomEffect) {
      document.startViewTransition(switchTheme)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const right = window.innerWidth - x
    const bottom = window.innerHeight - y
    const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom))

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        switchTheme()
      })
    })

    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  return (
    <div className="flex gap-2">
      <ThemeToggleEffectSelector />

      <Button
        variant="outline"
        size="icon"
        aria-label="Theme Toggle"
        onClick={handleThemeToggleClick}
      >
        <MoonIcon className="hidden [html.dark_&]:block" />
        <SunMediumIcon className="hidden [html.light_&]:block" />
      </Button>
    </div>
  )
}
