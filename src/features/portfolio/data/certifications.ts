import type { Certification } from "../types/certifications"

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    issueDate: "2026-08-08",
    credentialID: "Cisco-Modern-AI-2026",
    credentialURL: "https://www.netacad.com/",
    previewImage: "/images/certificates/cisco-modern-ai.png",
    description: `- **AI & ML Fundamentals**: Mastered core concepts in AI, computer vision, object classification, and LLM architecture.
- **Prompt Engineering & Tool Usage**: Learned effective prompt strategies, two-way chatbot interaction, multi-agent workflows, and web/image multimodal analysis.`,
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "LLMs",
      "Prompt Engineering",
      "Multimodal AI",
      "Cisco NetAcad",
    ],
    isExpanded: true,
  },
  {
    title: "Strategic Planning in the AI Age",
    issuer: "HP LIFE | HP Foundation",
    issueDate: "2026-07-30",
    credentialID: "HP-Strategic-AI-2026",
    credentialURL: "https://www.life-global.org/",
    previewImage: "/images/certificates/hp-strategic-planning.png",
    description: `- **AI Strategic Thinking**: Learned to leverage strategic planning frameworks to make high-impact business decisions in an AI-driven environment.
- **AI Decision Support**: Applied modern AI tools to evaluate business models, optimize strategic operations, and accelerate digital innovation.`,
    skills: [
      "Strategic Planning",
      "Business AI",
      "AI Frameworks",
      "Decision Making",
      "HP LIFE",
    ],
    isExpanded: false,
  },
  {
    title: "AI for Business Professionals",
    issuer: "HP LIFE | HP Foundation",
    issueDate: "2026-07-30",
    credentialID: "61baf6d9-9ee7-4a69-8fef-43829ab16b3a",
    credentialURL: "https://www.life-global.org/",
    previewImage: "/images/certificates/hp-ai-business.png",
    description: `- **Enterprise AI Integration**: Explored standalone AI tools vs. embedded features to streamline enterprise workflows.
- **Prompting & Ethics**: Mastered practical prompt engineering and ethical AI guidelines for business growth.`,
    skills: [
      "Business AI",
      "Prompt Engineering",
      "Ethical AI",
      "Workflow Automation",
      "HP LIFE",
    ],
    isExpanded: false,
  },
]
