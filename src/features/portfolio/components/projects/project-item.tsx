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
          <Image
            src={project.logo}
            alt={project.title}
            width={32}
            height={32}
            quality={100}
            className="mx-4 flex size-6 shrink-0 grayscale select-none group-hover/project:grayscale-0"
            unoptimized
            aria-hidden
          />
        ) : (
          <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/50 ring-offset-1 ring-offset-background select-none dark:ring-line">
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
