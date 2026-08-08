export interface BlogPost {
  id: string
  title: string
  link: string
  image: string
  publishedAt: string
  platform: "Medium" | "Hashnode" | "Dev.to" | "Blog"
  summary?: string
}
