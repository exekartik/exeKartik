import type { ImageProps } from "next/image"
import Image from "next/image"
import { format } from "date-fns"

import type { BlogPost } from "@/features/portfolio/types/blogs"

export function BlogItem({
  post,
  imageLoading = "lazy",
}: {
  post: BlogPost
  imageLoading?: ImageProps["loading"]
}) {
  return (
    <div className="group/post relative flex h-full flex-col gap-2 rounded-xl border border-transparent p-2 transition-[background-color] ease-out hover:border-line/40 hover:bg-accent-muted">
      <div className="relative overflow-hidden select-none [--image-radius:var(--radius-xl)]">
        <Image
          className="aspect-1200/630 w-full rounded-(--image-radius) object-cover grayscale transition-[filter,transform] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/post:scale-[1.02] group-hover/post:grayscale-0"
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          quality={100}
          loading={imageLoading}
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 rounded-(--image-radius) inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1.5 p-2">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              {post.platform}
            </span>
          </div>

          <h3 className="text-base leading-snug font-medium text-balance group-hover/post:text-foreground">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0"
            >
              {post.title}
            </a>
          </h3>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={new Date(post.publishedAt).toISOString()}>
            {format(new Date(post.publishedAt), "dd.MM.yyyy")}
          </time>
          <span className="font-mono text-[11px] transition-transform group-hover/post:translate-x-0.5">
            Read article →
          </span>
        </div>
      </div>
    </div>
  )
}
