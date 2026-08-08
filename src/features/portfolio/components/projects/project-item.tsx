import Image from "next/image"
import { addQueryParams } from "@/utils/url"
import { BoxIcon, InfinityIcon, LinkIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { LinkPreview } from "@/components/ui/link-preview"
import { Tag } from "@/components/ui/tag"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Markdown } from "@/components/markdown"

import type { Project } from "../../types/projects"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const start = project.period?.start
  const end = project.period?.end
  const isOngoing = !end
  const isSinglePeriod = end === start

  const projectUrl = addQueryParams(project.link, UTM_PARAMS)

  return (
    <Collapsible className={className} defaultOpen={project.isExpanded}>
      <div className="group/project flex items-center hover:bg-accent-muted">
        {project.logo ? (
          <div className="mr-2 ml-6 flex size-6 shrink-0 items-center justify-center text-muted-foreground group-hover/project:text-foreground">
            {project.id === "doctors-vision" && (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.89 1 3 1.89 3 3V21A2 2 0 0 0 5 23H19A2 2 0 0 0 21 21V9M19 9H14V4H19V9Z" />
              </svg>
            )}
            {project.id === "google-takeout-extension" && (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            )}
            {project.id === "social-sparrow" && (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
              </svg>
            )}
          </div>
        ) : (
          <div className="mr-2 ml-6 flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background select-none dark:ring-line">
            <BoxIcon className="size-4" />
          </div>
        )}

        <div className="flex flex-1 items-center justify-between border-l border-dashed border-line p-4 pr-2">
          <div className="min-w-0 flex-1 pr-2">
            <CollapsibleTrigger className="w-full text-left">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {project.previewImage ? (
                  <span className="inline-block">
                    <LinkPreview
                      url={projectUrl}
                      imageSrc={project.previewImage}
                      objectFit={project.objectFit}
                      className="font-medium text-foreground no-underline hover:underline"
                    >
                      {project.title}
                    </LinkPreview>
                  </span>
                ) : (
                  project.title
                )}
              </h3>

              {start && (
                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-0.5">
                    <span>{start}</span>
                    {!isSinglePeriod && (
                      <>
                        <span className="font-mono">—</span>
                        {isOngoing ? (
                          <InfinityIcon
                            className="size-4.5 translate-y-[0.5px]"
                            aria-label="Present"
                          />
                        ) : (
                          <span>{end}</span>
                        )}
                      </>
                    )}
                  </dd>
                </dl>
              )}
            </CollapsibleTrigger>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.githubUrl && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener"
                      aria-label="View GitHub repository"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-4"
                      >
                        <path
                          d="M12 0C5.37 0 0 5.372 0 11.997 0 17.3 3.438 21.795 8.205 23.38c.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.609-4.042-1.609C4.422 17.77 3.633 17.4 3.633 17.4c-1.087-.744.084-.73.084-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.417-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.929 0-1.31.465-2.38 1.235-3.219-.135-.303-.54-1.523.105-3.175 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.006 2.04.138 3 .404 2.28-1.551 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.608-2.805 5.623-5.475 5.918.42.36.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.284 0 .315.21.69.825.57C20.565 21.79 24 17.291 24 11.997 24 5.372 18.627 0 12 0"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  }
                />
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>
            )}

            {project.previewImage ? (
              <LinkPreview
                url={projectUrl}
                imageSrc={project.previewImage}
                objectFit={project.objectFit}
                className="relative z-10 flex size-6 shrink-0 items-center justify-center text-muted-foreground no-underline hover:text-foreground"
              >
                <LinkIcon className="pointer-events-none size-4" />
              </LinkPreview>
            ) : (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={projectUrl}
                      target="_blank"
                      rel="noopener"
                      aria-label="Open project"
                    >
                      <LinkIcon className="pointer-events-none size-4" />
                    </a>
                  }
                />
                <TooltipContent>
                  <p>Open project</p>
                </TooltipContent>
              </Tooltip>
            )}

            <CollapsibleTrigger className="shrink-0 p-1 text-muted-foreground [&_svg]:size-4">
              <CollapsibleChevronsUpDownIcon duration={0.15} />
            </CollapsibleTrigger>
          </div>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          {project.description && (
            <div className="typeset typeset-description">
              <Markdown>{project.description}</Markdown>
            </div>
          )}

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
