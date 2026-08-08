import { CameraIcon, MusicIcon, VideoIcon } from "lucide-react"

import type { Interest } from "../types/interests"

export const INTERESTS: Interest[] = [
  {
    id: "music",
    title: "Music & Content",
    description:
      "Curated playlists and music that fuels creativity. Listen to my specially crafted playlist.",
    link: "https://music.youtube.com/playlist?list=PLwvEwCHkUeHmHz5tp3WGpSS45o1gPmox5",
    icon: <MusicIcon />,
    category: "music",
  },
  {
    id: "photography",
    title: "Photography",
    description:
      "Capturing moments and telling visual stories through the lens. Every frame matters.",
    icon: <CameraIcon />,
    category: "photography",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "Creating engaging content and reels. Bringing stories to life through editing.",
    icon: <VideoIcon />,
    category: "other",
  },
]
