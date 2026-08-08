"use client"

import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { INTERESTS } from "@/features/portfolio/data/interests"

import { InterestItem } from "./interest-item"

const ID = "interests"

export function Interests() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Interests & Hobbies</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="grid gap-4 p-4 sm:grid-cols-3">
        {INTERESTS.map((interest) => (
          <InterestItem key={interest.id} interest={interest} />
        ))}
      </div>
    </Panel>
  )
}
