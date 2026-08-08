import { UsersIcon } from "lucide-react"

import type { CommunityRole } from "../types/community"

export const COMMUNITY_ROLES: CommunityRole[] = [
  {
    id: "calegends-official",
    name: "CA Legends Official",
    platform: "Instagram",
    role: "Community Manager & Content Strategist",
    members: "160K+ Followers",
    description: `Leading India's 3rd largest CA community with strategic content and engagement initiatives.`,
    achievements: [
      "**Community Growth**: Scaled to 160K+ followers through strategic content",
      "**Content Leadership**: Published educational content on taxation, GST, and CA prep",
      "**Engagement Strategy**: Built interactive channels for CA professionals and students",
      "**Brand Partnerships**: Coordinated with CA firms for collaborative webinars",
    ],
    link: "https://www.instagram.com/calegendsofficial",
    icon: <UsersIcon />,
    startDate: "2023",
    isActive: true,
  },
]
