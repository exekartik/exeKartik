import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "mdu",
    school: "Maharishi Dayanand University Rohtak",
    degree: "Bachelor of Technology",
    fieldOfStudy: "Computer Science Engineering",
    period: {
      start: "2022",
      end: "2026",
    },
    description: `- Pursuing B.Tech in Computer Science Engineering.
- Passionate about web development and full-stack engineering.
- Building modern scalable web applications using React, Next.js, and Node.js.`,
    skills: [
      "DSA",
      "JavaScript",
      "TypeScript",
      "Java",
      "React",
      "Node.js",
      "Next.js",
    ],
  },
  {
    id: "rawal-convent",
    school: "Rawal Convent School",
    degree: "Senior Secondary (Class XII)",
    fieldOfStudy: "Science Stream",
    period: {
      start: "2021",
      end: "2022",
    },
    description: `- Completed Class 12th (Senior Secondary) education.
- Built a strong foundation in Physics, Chemistry, and Mathematics.`,
    skills: ["Physics", "Chemistry", "Mathematics", "English"],
  },
  {
    id: "modern-bp-public",
    school: "Modern B.P. Public School",
    degree: "Secondary (Class X)",
    period: {
      start: "2019",
      end: "2020",
    },
    description: `- Completed Class 10th (Secondary School) education.`,
    skills: ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  },
]
