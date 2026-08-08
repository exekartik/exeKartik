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
        description: `- **Full-Stack Architecture & Leadership**: Spearheaded the technical architecture, UI/UX design, and development of web platforms supporting Chartered Accountants (CAs) and financial advisory teams.
- **CA Workflow & Audit Automation**: Engineered automated document ingestion, tax compliance trackers, and financial auditing calculators to streamline daily Chartered Accountant operations.
- **Client & Financial Dashboards**: Developed interactive real-time dashboards for CAs to manage GST filings, income tax returns, compliance deadlines, and financial audit reports securely.
- **Performance & Security**: Implemented role-based access controls (RBAC), data encryption, and mobile-first responsive interfaces achieving high SEO and performance benchmarks using Next.js, React, TypeScript, and Tailwind CSS.`,
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "Audit Systems",
          "Financial Software",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
]
