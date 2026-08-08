import Image from "next/image"
import { CircleCheckBigIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
  AccentureIcon,
  AnimationsDevIcon,
  CourseraIcon,
  GoogleIcon,
  MetaIcon,
  MicrosoftIcon,
  VercelIcon,
} from "@/components/icons"
import { Markdown } from "@/components/markdown"

import type { Certification } from "../../types/certifications"

const ISSUER_ICONS: Record<string, React.ReactNode> = {
  accenture: <AccentureIcon />,
  animationsdev: <AnimationsDevIcon />,
  coursera: <CourseraIcon />,
  google: <GoogleIcon />,
  meta: <MetaIcon />,
  microsoft: <MicrosoftIcon />,
  vercel: <VercelIcon />,
}

export function CertificationItem({
  className,
  certification,
}: {
  className?: string
  certification: Certification
}) {
  return (
    <Collapsible
      className={cn(
        "group/certification screen-line-bottom relative py-3",
        className
      )}
      defaultOpen={certification.isExpanded}
      disabled={!certification.description}
    >
      <CollapsibleTrigger
        className={cn(
          "group block w-full cursor-pointer text-left",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-2 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
          "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
          "data-disabled:before:content-none"
        )}
      >
        <div className="flex items-center pr-2">
          {certification.issuerLogoURL ? (
            <Image
              src={certification.issuerLogoURL}
              alt={certification.issuer}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none dark:grayscale"
              unoptimized
              aria-hidden
            />
          ) : (
            <div
              className={cn(
                "mx-4 flex size-6 shrink-0 items-center justify-center rounded-md select-none",
                "border border-muted-foreground/15 ring-1 ring-border/50 ring-offset-1 ring-offset-background dark:ring-line",
                "bg-muted text-muted-foreground [&_svg]:size-4"
              )}
            >
              {(certification.issuerIconName
                ? ISSUER_ICONS[certification.issuerIconName]
                : null) ?? <CircleCheckBigIcon />}
            </div>
          )}

          <div className="flex-1 space-y-1 border-l border-dashed border-line p-3 pr-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="leading-snug font-medium text-balance">
                {certification.previewImage && certification.credentialURL ? (
                  <span className="inline-block">
                    <LinkPreview
                      url={certification.credentialURL}
                      imageSrc={certification.previewImage}
                      className="font-medium text-foreground no-underline hover:underline"
                    >
                      {certification.title}
                    </LinkPreview>
                  </span>
                ) : (
                  certification.title
                )}
              </h3>

              <div className="shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:h-lh [&_svg]:w-4">
                <CollapsibleChevronsUpDownIcon duration={0.15} />
              </div>
            </div>

            <dl className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
              <div>
                <dt className="sr-only">Issued by</dt>
                <dd>
                  <span aria-hidden>@</span>
                  <span className="ml-0.5">{certification.issuer}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {certification.description && (
          <div className="typeset typeset-description pt-3 pr-4 pb-1 pl-16">
            <Markdown>{certification.description}</Markdown>
          </div>
        )}
      </CollapsibleContent>

      {Array.isArray(certification.skills) &&
        certification.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-3 pr-4 pl-16">
            {certification.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
    </Collapsible>
  )
}
