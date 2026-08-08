"use client"

import { ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"

import type { CommunityRole } from "../../types/community"

function parseMarkdownBold(text: string) {
  // Simple parser for **bold** text
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function CommunityItem({
  className,
  community,
}: {
  className?: string
  community: CommunityRole
}) {
  return (
    <Collapsible
      className={cn(
        "group/community screen-line-bottom relative py-3",
        className
      )}
      defaultOpen={true}
    >
      <CollapsibleTrigger
        className={cn(
          "group block w-full cursor-pointer text-left",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-2 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
          "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50"
        )}
      >
        <div className="flex items-center pr-2">
          <div
            className={cn(
              "mx-4 flex size-6 shrink-0 items-center justify-center rounded-md select-none",
              "border border-muted-foreground/15 ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line",
              "bg-muted text-muted-foreground [&_svg]:size-4"
            )}
          >
            {community.icon}
          </div>

          <div className="flex-1 space-y-1 border-l border-dashed border-line p-3 pr-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="leading-snug font-medium text-balance">
                  {community.link ? (
                    <a
                      href={community.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {community.name}
                      <ExternalLinkIcon className="size-3.5" />
                    </a>
                  ) : (
                    community.name
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {community.role}
                </p>
              </div>

              <div className="shrink-0 text-muted-foreground [&_svg]:h-lh [&_svg]:w-4">
                <CollapsibleChevronsUpDownIcon duration={0.15} />
              </div>
            </div>

            <dl className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <div>
                <dt className="sr-only">Platform</dt>
                <dd>{community.platform}</dd>
              </div>
              <span>•</span>
              <div>
                <dt className="sr-only">Reach</dt>
                <dd className="font-medium">{community.members}</dd>
              </div>
              {community.isActive && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Status</dt>
                    <dd className="flex items-center gap-1">
                      <span className="relative flex size-2.5 translate-x-px translate-y-px items-center justify-center">
                        <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-info opacity-50" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-info" />
                      </span>
                      <span className="text-xs">Active</span>
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        <div className="typeset typeset-description pt-3 pr-4 pb-1 pl-16">
          <p className="text-balance">{community.description}</p>

          {community.achievements && community.achievements.length > 0 && (
            <div className="mt-3">
              <ul className="list-disc space-y-2 pl-5">
                {community.achievements.map((achievement, index) => (
                  <li key={index} className="text-balance">
                    {parseMarkdownBold(achievement)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CollapsibleContent>

      {community.startDate && (
        <div className="pt-3 pr-4 pl-16 text-sm text-muted-foreground">
          Since {community.startDate}
        </div>
      )}
    </Collapsible>
  )
}
