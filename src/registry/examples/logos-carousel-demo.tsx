import { LogosCarousel } from "@/registry/components/logos-carousel"

const SAMPLE_LOGOS = [
  { name: "Next.js", text: "NEXT.JS" },
  { name: "React", text: "REACT" },
  { name: "Tailwind CSS", text: "TAILWIND" },
  { name: "TypeScript", text: "TYPESCRIPT" },
  { name: "Node.js", text: "NODE.JS" },
]

export default function LogosCarouselDemo() {
  return (
    <LogosCarousel className="w-full py-4 text-foreground">
      {SAMPLE_LOGOS.map((item) => (
        <span
          key={item.name}
          className="px-4 font-mono font-bold tracking-wider"
        >
          {item.text}
        </span>
      ))}
    </LogosCarousel>
  )
}
