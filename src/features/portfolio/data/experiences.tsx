import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  LightbulbIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "the-auditors-club",
    companyName: "The Auditors Club",
    companyWebsite: "https://www.theauditorsclub.in/",
    previewImage: "/images/experiences/auditors-club-preview.png",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    location: "Gurgaon, Haryana",
    locationType: "Hybrid",
    positions: [
      {
        id: "1",
        title: "Website Development Lead",
        employmentPeriod: {
          start: "2026",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Led the website development team.
- Designed and built responsive web interfaces.`,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
]
