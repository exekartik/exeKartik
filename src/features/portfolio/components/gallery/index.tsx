import {
  Panel,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { GALLERY_ITEMS } from "@/features/portfolio/data/gallery"

import { GalleryGrid } from "./gallery-grid"

const ID = "gallery"

export function Gallery() {
  if (GALLERY_ITEMS.length === 0) {
    return null // Don't render if no gallery items
  }

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Gallery</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
        <PanelDescription>
          A collection of my photography, travel moments, and creative reels
        </PanelDescription>
      </PanelHeader>

      <GalleryGrid items={GALLERY_ITEMS} />
    </Panel>
  )
}
