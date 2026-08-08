export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string
  title: string
  /**
   * Project period for display and sorting (optional).
   */
  period?: {
    /** Start date or period text */
    start?: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** Public URL (site, repository, demo, or video). */
  link: string
  /** Tags/technologies for chips or filtering. */
  skills: string[]
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string
  /** Logo image URL (absolute or path under /public). */
  logo?: string
  /** Hover preview image URL for animated cursor card. */
  previewImage?: string
  /** Image object-fit mode for hover card: cover (default) or contain. */
  objectFit?: "cover" | "contain"
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean
}
