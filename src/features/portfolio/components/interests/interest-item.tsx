"use client"

import { cn } from "@/lib/utils"

import type { Interest } from "../../types/interests"

export function InterestItem({ interest }: { interest: Interest }) {
  const content = (
    <div
      className={cn(
        "group/interest relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border p-6 transition-all duration-300 ease-out",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
        "hover:-translate-y-1 hover:border-foreground/20",
        interest.link && "cursor-pointer"
      )}
    >
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/interest:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      {/* Icon with animated background */}
      <div className="relative">
        <div
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-xl",
            "bg-muted text-muted-foreground",
            "border border-border transition-all duration-300",
            "group-hover/interest:scale-110 group-hover/interest:border-foreground/20",
            "group-hover/interest:bg-accent group-hover/interest:text-foreground",
            "[&_svg]:size-6 [&_svg]:transition-transform [&_svg]:duration-300",
            "group-hover/interest:[&_svg]:scale-110"
          )}
        >
          {interest.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1">
        <h3 className="mb-2 text-lg font-semibold text-balance transition-colors group-hover/interest:text-foreground">
          {interest.title}
        </h3>
        <p className="text-sm leading-relaxed text-balance text-muted-foreground transition-colors group-hover/interest:text-foreground/80">
          {interest.description}
        </p>
      </div>

      {/* Animated border gradient */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/interest:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-xl" />
      </div>
    </div>
  )

  if (interest.link) {
    return (
      <a
        href={interest.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        {content}
      </a>
    )
  }

  return content
}
