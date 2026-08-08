export type Interest = {
  id: string
  title: string
  description: string
  link?: string
  linkText?: string
  icon?: React.ReactElement
  category: "music" | "travel" | "photography" | "other"
}

export type GalleryItem = {
  id: string
  title: string
  description?: string
  image: string
  type: "photo" | "reel" | "video"
  link?: string
  date?: string
  location?: string
}
