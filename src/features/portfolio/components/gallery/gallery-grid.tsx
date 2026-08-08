"use client"

import Image from "next/image"
import { CameraIcon, MapPinIcon, PlayCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import type { GalleryItem } from "../../types/interests"

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const content = (
    <div className="group/gallery relative h-full overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover/gallery:scale-105"
        />

        {item.type === "reel" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircleIcon className="size-12 text-white/90" />
          </div>
        )}

        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircleIcon className="size-12 text-white/90" />
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="mb-1 font-medium text-balance">{item.title}</h3>

        {item.description && (
          <p className="mb-2 text-sm text-balance text-muted-foreground">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPinIcon className="size-3" />
              <span>{item.location}</span>
            </div>
          )}

          {item.date && (
            <div className="flex items-center gap-1">
              <CameraIcon className="size-3" />
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "no-underline transition-transform hover:scale-[1.02]",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        )}
      >
        {content}
      </a>
    )
  }

  return content
}
