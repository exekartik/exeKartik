"use client"

import { useCallback, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { META_THEME_COLORS } from "@/config/site"
import { cn } from "@/lib/utils"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useMetaColor } from "@/hooks/use-meta-color"

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star"

export interface AnimatedThemeTogglerProps extends React.ComponentPropsWithRef<"button"> {
  duration?: number
  variant?: TransitionVariant
  /** When true, the transition expands from the viewport center instead of the button center. */
  fromCenter?: boolean
  /**
   * Controlled theme value. When provided, the component uses this instead of useTheme().
   */
  theme?: "light" | "dark"
  /** Called on toggle. Pair with `theme` for controlled usage. */
  onThemeChange?: (theme: "light" | "dark") => void
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ")
  return `polygon(${pairs})`
}

// All coordinates are percentages of the snapshot reference box to avoid
// display-scaling mismatch on fractional scaling displays.
function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

  switch (variant) {
    case "circle":
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "triangle": {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`]
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2
      const verts = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${verts})`]
    }
    case "hexagon": {
      const R = maxRadius * 1.15
      const dx = (Math.sqrt(3) / 2) * R
      const verts = [
        point(cx, cy - R),
        point(cx + dx, cy - 0.5 * R),
        point(cx + dx, cy + 0.5 * R),
        point(cx, cy + R),
        point(cx - dx, cy + 0.5 * R),
        point(cx - dx, cy - 0.5 * R),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 6), `polygon(${verts})`]
    }
    case "rectangle": {
      const left = cx - Math.max(cx, viewportWidth - cx)
      const right = cx + Math.max(cx, viewportWidth - cx)
      const top = cy - Math.max(cy, viewportHeight - cy)
      const bottom = cy + Math.max(cy, viewportHeight - cy)
      const end = [
        point(left, top),
        point(right, top),
        point(right, bottom),
        point(left, bottom),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "star": {
      // 5-pointed star: 10 vertices alternating outer radius R and inner radius r.
      const R = maxRadius * 1.3
      const r = R * 0.382
      const verts: string[] = []
      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + (i * Math.PI) / 5
        const radius = i % 2 === 0 ? R : r
        verts.push(
          point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
        )
      }
      return [
        polygonCollapsed(point(cx, cy), 10),
        `polygon(${verts.join(", ")})`,
      ]
    }
  }
}

export function AnimatedThemeToggler({
  className,
  duration = 500,
  variant = "circle",
  fromCenter = false,
  theme: controlledTheme,
  onThemeChange,
  ref,
  onClick,
  ...props
}: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const { setMetaColor } = useMetaColor()
  const [click] = useClickSound()
  const internalRef = useRef<HTMLButtonElement>(null)

  const isControlled = controlledTheme !== undefined

  const toggleTheme = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)

      const isDark =
        controlledTheme === "dark" ||
        (controlledTheme === undefined &&
          (document.documentElement.classList.contains("dark") ||
            resolvedTheme === "dark"))

      const nextTheme: "light" | "dark" = isDark ? "light" : "dark"
      click()

      const updateDOM = () => {
        if (isControlled) {
          onThemeChange?.(nextTheme)
        } else {
          setTheme(nextTheme)
          setMetaColor(
            isDark ? META_THEME_COLORS.light : META_THEME_COLORS.dark
          )
        }
      }

      if (
        !("startViewTransition" in document) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        updateDOM()
        return
      }

      // Remove any leftover demo style element if present
      document.getElementById("theme-toggle-effect-demo-style")?.remove()

      const targetEl =
        event.currentTarget ||
        internalRef.current ||
        (props.id ? document.getElementById(props.id) : null) ||
        document.getElementById("theme-toggle-button")

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let cx = viewportWidth / 2
      let cy = viewportHeight / 2

      if (targetEl && !fromCenter) {
        const rect = targetEl.getBoundingClientRect()
        cx = rect.left + rect.width / 2
        cy = rect.top + rect.height / 2
      }

      const maxRadius = Math.hypot(
        Math.max(cx, viewportWidth - cx),
        Math.max(cy, viewportHeight - cy)
      )

      const [startClip, endClip] = getThemeTransitionClipPaths(
        variant,
        cx,
        cy,
        maxRadius,
        viewportWidth,
        viewportHeight
      )

      const transition = document.startViewTransition(() => {
        flushSync(updateDOM)
      })

      await transition.ready

      document.documentElement.animate(
        {
          clipPath: [startClip, endClip],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    },
    [
      click,
      controlledTheme,
      duration,
      fromCenter,
      isControlled,
      onClick,
      onThemeChange,
      props.id,
      resolvedTheme,
      setMetaColor,
      setTheme,
      variant,
    ]
  )

  return (
    <button
      ref={(node) => {
        internalRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref && "current" in ref) {
          ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node
        }
      }}
      type="button"
      className={cn(
        "relative flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      {...props}
    >
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
