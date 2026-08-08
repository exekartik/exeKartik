"use client"

import * as React from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

interface LinkPreviewProps {
  children: React.ReactNode
  url: string
  imageSrc: string
  className?: string
  width?: number
  height?: number
  objectFit?: "cover" | "contain"
  isStatic?: boolean
}

export function LinkPreview({
  children,
  url,
  imageSrc,
  className,
  width = 350,
  height = 195,
  objectFit = "cover",
}: LinkPreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const springConfig = { stiffness: 260, damping: 20 }
  const x = useMotionValue(0)
  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = eventOffsetX - targetRect.width / 2
    x.set(offsetFromCenter)
  }

  return (
    <div className="relative inline-block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false)
          x.set(0)
        }}
        onMouseMove={handleMouseMove}
        className={cn(
          "underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground",
          className
        )}
      >
        {children}
      </a>

      {isMounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: 5 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={{
                x: translateX,
              }}
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 transform-gpu"
            >
              <div
                className="overflow-hidden rounded-xl border border-line bg-background/95 p-1 shadow-2xl backdrop-blur-md dark:bg-card/95"
                style={{ width }}
              >
                {/* Window top control bar like browser preview */}
                <div className="flex items-center gap-1.5 border-b border-line/50 px-2 py-1.5">
                  <div className="size-2 rounded-full bg-red-500/80" />
                  <div className="size-2 rounded-full bg-yellow-500/80" />
                  <div className="size-2 rounded-full bg-green-500/80" />
                  <span className="ml-1 truncate font-mono text-[10px] text-muted-foreground">
                    {url.replace(/^https?:\/\//, "")}
                  </span>
                </div>

                <div
                  className={cn(
                    "relative overflow-hidden rounded-lg",
                    objectFit === "contain" && "bg-zinc-950"
                  )}
                  style={{ height }}
                >
                  <Image
                    src={imageSrc}
                    alt="Link preview"
                    fill
                    className={cn(
                      objectFit === "contain"
                        ? "object-contain p-1"
                        : "object-cover object-top"
                    )}
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
