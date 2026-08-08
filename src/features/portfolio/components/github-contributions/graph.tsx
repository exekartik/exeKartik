"use client"

import { use } from "react"
import { format, parseISO } from "date-fns"
import { LoaderIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import type { Activity } from "@/registry/components/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/registry/components/contribution-graph"
import { SOCIAL } from "@/features/portfolio/data/social-links"

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>
}) {
  const data = use(contributions)

  if (data.length === 0) {
    return null
  }

  return (
    <figure>
      <ContributionGraph
        className="mx-auto gap-4 py-4"
        data={data}
        blockSize={12}
        blockMargin={2}
        blockRadius={0}
        maxLevel={5}
        aria-label="Daily Coding & Learning Activity Graph"
      >
        <ContributionGraphCalendar
          className="px-4 **:data-[slot=month-labels]:text-muted-foreground"
          title="Daily Learning Activity"
          aria-hidden
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger
                render={
                  <g>
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  </g>
                }
              />
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} {activity.count === 1 ? "hour" : "hours"} of
                  coding & learning on{" "}
                  {format(parseISO(activity.date), "dd.MM.yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="gap-4 px-4 leading-none">
          <ContributionGraphTotalCount>
            {() => (
              <div className="whitespace-normal text-muted-foreground tabular-nums">
                Daily activity{" "}
                <span className="whitespace-nowrap">
                  ({format(parseISO(data[0].date), "dd.MM.yyyy")} –{" "}
                  {format(parseISO(data[data.length - 1].date), "dd.MM.yyyy")})
                </span>
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend aria-hidden>
            {({ level }) => {
              const hoursMap: Record<number, string> = {
                0: "0 hours (Rest)",
                1: "Level 1: 2 hours (Lightest fill)",
                2: "Level 2: 4 hours",
                3: "Level 3: 6 hours",
                4: "Level 4: 8 hours",
                5: "Level 5: 10 hours (Darkest fill)",
              }

              return (
                <Tooltip key={level}>
                  <TooltipTrigger
                    render={
                      <svg height={12} width={12}>
                        <rect
                          className="data-[level='0']:fill-muted-foreground/5 data-[level='1']:fill-muted-foreground/20 data-[level='2']:fill-muted-foreground/40 data-[level='3']:fill-muted-foreground/60 data-[level='4']:fill-muted-foreground/80 data-[level='5']:fill-muted-foreground"
                          data-level={level}
                          height={12}
                          rx={0}
                          ry={0}
                          width={12}
                        />
                      </svg>
                    }
                  />
                  <TooltipContent className="font-sans">
                    <p>{hoursMap[level] || `Level ${level}`}</p>
                  </TooltipContent>
                </Tooltip>
              )
            }}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>

      <figcaption className="screen-line-top px-4 py-3 text-center text-sm text-balance text-muted-foreground">
        FIG_002. Daily coding & learning activity
      </figcaption>
    </figure>
  )
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
