import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "doctors-vision",
    title: "Doctor's Vision",
    link: "https://doctor-s-vision.vercel.app/",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Auth.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "AI Vision",
      "OCR",
    ],
    description: `AI prescription scanner that converts doctor handwriting into structured patient-readable prescriptions with medicine names, dosages, and schedules.
- Integrated **AI Vision and OCR** pipeline to extract and parse handwritten prescriptions into **structured JSON** records stored in **PostgreSQL** via **Prisma ORM**
- Implemented **Auth.js** for secure multi-provider patient authentication with **session-based RBAC** to isolate patient medical data
- Applied **sliding-window rate limiting** on AI scanning endpoints to prevent abuse, ensuring consistent inference response times under concurrent load
- Built a **patient prescription dashboard** with searchable medicine history, dosage tracking, and doctor-issued instruction summaries`,
    logo: "/images/projects/doctors-vision.png",
    previewImage: "/images/projects/doctors-vision-preview.png",
    isExpanded: true,
  },
  {
    id: "google-takeout-extension",
    title: "Google Photos Takeout Helper",
    link: "https://github.com/exekartik/GoogleTakeoutExtension",
    skills: [
      "TypeScript",
      "Node.js",
      "EXIF Engine",
      "SHA-256",
      "Streams API",
      "CLI",
      "File System API",
    ],
    description: `Production-grade Node.js and TypeScript CLI tool to clean, deduplicate, date-tag, and organize chaotic Google Photos Takeout exports.
- Implemented a **4-tier date recovery hierarchy** (Google JSON sidecars, EXIF headers, filename regex, and year folders) using **exiftool-vendored** to write missing timestamps and GPS metadata directly into EXIF headers
- Built **streaming SHA-256 cryptographic hashing** for smart deduplication, merging identical files across album folders while preserving album structures via **symlinks and hardlinks**
- Engineered **magic byte inspection** (via file-type) to fix mismatched file extensions (.HEIC vs .JPG) and paired **Apple Live Photos & Google Motion Photos** (.HEIC/.JPG with .MOV/.MP4)
- Added **atomic progress tracking** (\`progress.json\`) for crash-resilient resumable execution and **OS timestamp synchronization** (btime/mtime) across Windows and POSIX systems`,
    logo: "/images/projects/google-takeout-cli.png",
    previewImage: "/images/projects/google-takeout-preview.png",
    objectFit: "contain",
    isExpanded: true,
  },
  {
    id: "social-sparrow",
    title: "Social Sparrow",
    link: "https://social-sparrow-self.vercel.app/",
    skills: [
      "React 19",
      "TypeScript",
      "Vite",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Mongoose",
      "Google Gemini",
      "Cloudinary",
      "Vercel",
    ],
    description: `AI-powered social media management and automated post scheduling platform — compose once and publish across Twitter/X, LinkedIn, Facebook, and Instagram.
- Built an **AI Composer** using **Google Gemini SDK** to instantly convert post topics into polished, platform-ready captions with a custom **tone selector** (Professional, Casual, Witty, Hype, Educational) and one-click transfer to the post scheduler queue
- Implemented a **JWT dual-token authentication** system with short-lived access tokens and **SHA256-hashed refresh tokens**, paired with **Mongoose bcrypt pre-save hashing** and strict input validation for enterprise-grade security
- Engineered a **background post scheduler service** on **Express.js 5** with **MongoDB Atlas** and serverless-optimized **Mongoose connection pooling** for lazy initialization on Vercel serverless functions
- Integrated **Cloudinary CDN** for drag-and-drop media uploads and **Zernio Social API** for seamless multi-platform account connections with status toggles and avatar sync`,
    logo: "/images/projects/socialsparrow.png",
    previewImage: "/images/projects/socialsparrow-preview.png",
    isExpanded: true,
  },
]
