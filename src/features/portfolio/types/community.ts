export type CommunityRole = {
  id: string
  name: string
  platform: string
  role: string
  members: string
  description: string
  achievements: string[]
  link?: string
  icon?: React.ReactElement
  image?: string
  startDate: string
  isActive?: boolean
}
