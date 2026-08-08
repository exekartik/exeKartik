"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * Designed by ncdai on Figma with [Fast Isometric Plugin](https://www.figma.com/community/plugin/1249759048471403961).
 * Inspired by tailwindcss.com.
 */
export function ChanhDaiMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `ncdai-face-pattern-${id}`,
    faceFill: `ncdai-face-fill-${id}`,
    stroke: `ncdai-stroke-${id}`,
    radialGradient: `ncdai-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              transform: "translate(0px, 0px)",
            },
            pressed: {
              transform: "translate(0px, 16px)",
            },
          }}
          transition={transition}
        >
          {/* e1 */}
          <path
            fillRule="evenodd"
            d="M120.38 70L205.25 119L144.63 154L84.01 119L59.76 133L120.38 168L96.13 182L11.26 133Z M120.38 98L156.75 119L132.51 133L96.13 112Z"
          />
          {/* x */}
          <path
            fillRule="evenodd"
            d="M284.06 101.5L308.31 115.5L308.31 143.5L356.81 143.5L381.05 157.5L356.81 171.5L308.31 171.5L308.31 199.5L284.06 213.5L259.81 199.5L259.81 171.5L211.31 171.5L187.06 157.5L211.31 143.5L259.81 143.5L259.81 115.5Z"
          />
          {/* e2 */}
          <path
            fillRule="evenodd"
            d="M459.86 140L544.73 189L484.11 224L423.49 189L399.24 203L459.86 238L435.61 252L350.74 203Z M459.86 168L496.24 189L471.99 203L435.61 182Z"
          />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: "M120.38 70L205.25 119L144.63 154L84.01 119L59.76 133L120.38 168L96.13 182L11.26 133ZM120.38 98L156.75 119L132.51 133L96.13 112ZM120.38 70.00V102.00M205.25 119.00V151.00M59.76 133.00V165.00M120.38 168.00V200.00M11.26 133.00V165.00M120.38 102.00L205.25 151.00M59.76 165.00L120.38 200.00M11.26 165.00L120.38 102.00M156.75 151.00L132.51 165.00M156.75 119.00V151.00M132.51 165.00L96.13 144.00M132.51 133.00V165.00M284.06 101.5L308.31 115.5L308.31 143.5L356.81 143.5L381.05 157.5L356.81 171.5L308.31 171.5L308.31 199.5L284.06 213.5L259.81 199.5L259.81 171.5L211.31 171.5L187.06 157.5L211.31 143.5L259.81 143.5L259.81 115.5ZM284.06 101.50V133.50M308.31 115.50V147.50M308.31 143.50V175.50M356.81 143.50V175.50M381.05 157.50V189.50M187.06 157.50V189.50M211.31 143.50V175.50M259.81 143.50V175.50M259.81 115.50V147.50M284.06 133.50L308.31 147.50M308.31 175.50L356.81 175.50M356.81 175.50L381.05 189.50M187.06 189.50L211.31 175.50M211.31 175.50L259.81 175.50M259.81 147.50L284.06 133.50M459.86 140L544.73 189L484.11 224L423.49 189L399.24 203L459.86 238L435.61 252L350.74 203ZM459.86 168L496.24 189L471.99 203L435.61 182ZM459.86 140.00V172.00M544.73 189.00V221.00M399.24 203.00V235.00M459.86 238.00V270.00M350.74 203.00V235.00M459.86 172.00L544.73 221.00M399.24 235.00L459.86 270.00M350.74 235.00L459.86 172.00M496.24 221.00L471.99 235.00M496.24 189.00V221.00M471.99 235.00L435.61 214.00M471.99 203.00V235.00",
            },
            pressed: {
              d: "M120.38 86L205.25 135L144.63 170L84.01 135L59.76 149L120.38 184L96.13 198L11.26 149ZM120.38 114L156.75 135L132.51 149L96.13 128ZM120.38 86.00V102.00M205.25 135.00V151.00M59.76 149.00V165.00M120.38 184.00V200.00M11.26 149.00V165.00M120.38 102.00L205.25 151.00M59.76 165.00L120.38 200.00M11.26 165.00L120.38 102.00M156.75 151.00L132.51 165.00M156.75 135.00V151.00M132.51 165.00L96.13 144.00M132.51 149.00V165.00M284.06 117.5L308.31 131.5L308.31 159.5L356.81 159.5L381.05 173.5L356.81 187.5L308.31 187.5L308.31 215.5L284.06 229.5L259.81 215.5L259.81 187.5L211.31 187.5L187.06 173.5L211.31 159.5L259.81 159.5L259.81 131.5ZM284.06 117.50V133.50M308.31 131.50V147.50M308.31 159.50V175.50M356.81 159.50V175.50M381.05 173.50V189.50M187.06 173.50V189.50M211.31 159.50V175.50M259.81 159.50V175.50M259.81 131.50V147.50M284.06 133.50L308.31 147.50M308.31 175.50L356.81 175.50M356.81 175.50L381.05 189.50M187.06 189.50L211.31 175.50M211.31 175.50L259.81 175.50M259.81 147.50L284.06 133.50M459.86 156L544.73 205L484.11 240L423.49 205L399.24 219L459.86 254L435.61 268L350.74 219ZM459.86 184L496.24 205L471.99 219L435.61 198ZM459.86 156.00V172.00M544.73 205.00V221.00M399.24 219.00V235.00M459.86 254.00V270.00M350.74 219.00V235.00M459.86 172.00L544.73 221.00M399.24 235.00L459.86 270.00M350.74 235.00L459.86 172.00M496.24 221.00L471.99 235.00M496.24 205.00V221.00M471.99 235.00L435.61 214.00M471.99 219.00V235.00",
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        {/* <path d="M-782.39 676.57L949.67 -323.41" /> */}
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
        {/* <path d="M1337.65 612.57L-394.41 -387.41" /> */}
      </g>

      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: "M120.38 70L205.25 119V151L120.38 102ZM59.76 133L120.38 168V200L59.76 165ZM11.26 133L120.38 70V102L11.26 165ZM156.75 119L132.51 133V165L156.75 151ZM132.51 133L96.13 112V144L132.51 165ZM284.06 101.5L308.31 115.5V147.5L284.06 133.5ZM308.31 143.5L356.81 143.5V175.5L308.31 175.5ZM356.81 143.5L381.05 157.5V189.5L356.81 175.5ZM187.06 157.5L211.31 143.5V175.5L187.06 189.5ZM211.31 143.5L259.81 143.5V175.5L211.31 175.5ZM259.81 115.5L284.06 101.5V133.5L259.81 147.5ZM459.86 140L544.73 189V221L459.86 172ZM399.24 203L459.86 238V270L399.24 235ZM350.74 203L459.86 140V172L350.74 235ZM496.24 189L471.99 203V235L496.24 221ZM471.99 203L435.61 182V214L471.99 235Z",
            },
            pressed: {
              d: "M120.38 86L205.25 135V151L120.38 102ZM59.76 149L120.38 184V200L59.76 165ZM11.26 149L120.38 86V102L11.26 165ZM156.75 135L132.51 149V165L156.75 151ZM132.51 149L96.13 128V144L132.51 165ZM284.06 117.5L308.31 131.5V147.5L284.06 133.5ZM308.31 159.5L356.81 159.5V175.5L308.31 175.5ZM356.81 159.5L381.05 173.5V189.5L356.81 175.5ZM187.06 173.5L211.31 159.5V175.5L187.06 189.5ZM211.31 159.5L259.81 159.5V175.5L211.31 175.5ZM259.81 131.5L284.06 117.5V133.5L259.81 147.5ZM459.86 156L544.73 205V221L459.86 172ZM399.24 219L459.86 254V270L399.24 235ZM350.74 219L459.86 156V172L350.74 235ZM496.24 205L471.99 219V235L496.24 221ZM471.99 219L435.61 198V214L471.99 235Z",
            },
          }}
          transition={transition}
        />
      </g>

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      {/* <motion.path
        variants={{
          normal: {
            d: [
              // C
              "M28.21 240.58 L0.50 224.58 V192.58 L111.35 128.58 L166.78 160.58 V192.58 L83.64 240.58",
              "M166.78 160.58 L0.50 256.58 V288.58 L111.35 352.58 L166.78 320.58 L222.20 352.58 L333.05 288.58 V256.58 L277.63 224.58 L166.78 288.58 L0.50 192.58",
              "M0.50 256.58 L111.35 320.58 L166.78 288.58 L222.20 320.58 L333.05 256.58",
              "M111.35 320.58 V352.58",
              "M166.78 288.58 V320.58",
              "M222.20 320.58 V352.58",
              // D
              "M499.33 96.58 L554.76 128.58 V160.58 L388.48 256.58 L166.78 128.58 V96.58 L333.05 0.58 L499.33 96.58",
              "M166.78 96.58 L388.48 224.58 L554.76 128.58",
              "M527.04 112.58 L554.76 96.58 V64.58 L443.90 0.58 L277.63 96.58 L388.48 160.58 L554.76 64.58",
              "M305.34 112.58 L388.48 64.58 L471.62 112.58",
              "M388.48 224.58 V256.58",
              "M388.48 32.58 V64.58",
            ].join(""),
          },
          pressed: {
            d: [
              // C
              "M42.07 248.58 L0.50 224.58 V208.58 L111.35 144.58 L166.78 176.58 V192.58 L69.78 248.58",
              "M166.78 176.58 L0.5 272.58 V288.58 L111.35 352.58 L166.78 320.58 L222.20 352.58 L333.05 288.58 V272.58 L277.63 240.58 L166.78 304.58 L0.5 208.58",
              "M0.5 272.58 L111.35 336.58 L166.78 304.58 L222.20 336.58 L333.05 272.58",
              "M111.35 336.58 V352.58",
              "M166.78 304.58 V320.58",
              "M222.20 336.58 V352.58",
              // D
              "M499.33 112.58 L554.76 144.58 V160.58 L388.48 256.58 L166.78 128.58 V112.58 L333.05 16.58 L499.33 112.58",
              "M166.78 112.58 L388.48 240.58 L554.76 144.58",
              "M513.19 120.58 L554.76 96.58 V80.58 L443.90 16.58 L277.63 112.58 L388.48 176.58 L554.76 80.58",
              "M291.48 120.58 L388.48 64.58 L485.47 120.58",
              "M388.48 240.58 V256.58",
              "M388.48 48.58 V64.58",
            ].join(""),
          },
        }}
        transition={transition}
        stroke="var(--stroke)"
      /> */}

      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />
    </motion.svg>
  )
}
