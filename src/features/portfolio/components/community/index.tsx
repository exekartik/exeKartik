"use client"

import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { COMMUNITY_ROLES } from "@/features/portfolio/data/community"

import { CommunityItem } from "./community-item"

const ID = "community"

export function Community() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Community Leadership</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {COMMUNITY_ROLES.map((community) => (
          <CommunityItem key={community.id} community={community} />
        ))}
      </div>
    </Panel>
  )
}
