"use client"

import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Panel, PanelContent } from "@/features/portfolio/components/panel"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((item) => {
            const url = addQueryParams(item.href, UTM_PARAMS)
            return (
              <li key={item.name}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="cursor-pointer text-foreground/80 shadow-none [&_svg:not([class*='size-'])]:size-4.5"
                        variant="outline"
                        size="icon-sm"
                        render={
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.title}
                          />
                        }
                      >
                        {SOCIAL_ICONS[item.name]}
                        <span className="sr-only">{item.title}</span>
                      </Button>
                    }
                  />
                  <TooltipContent>
                    {item.title} ({item.handle})
                  </TooltipContent>
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </PanelContent>
    </Panel>
  )
}
