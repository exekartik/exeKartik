import "server-only"

import { unstable_cache } from "next/cache"
import { formatISO, subDays } from "date-fns"

import type { Activity } from "@/registry/components/contribution-graph"

function generateDailyActivity(): Activity[] {
  const activities: Activity[] = []
  const today = new Date()

  // Generate 365 days of activity up to today
  for (let i = 364; i >= 0; i--) {
    const d = subDays(today, i)
    const dateStr = formatISO(d, { representation: "date" })
    const month = d.getMonth() + 1 // 1-12
    const dayOfWeek = d.getDay() // 0 = Sun, 6 = Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    let hours = 6 // Default base

    // Deterministic pseudo-random value based on index
    const pseudoRandom = (Math.sin(i * 1234.567 + 89.1) + 1) / 2

    // May (5), June (6), July (7): Heavy 8h to 10h daily learning surge
    if (month >= 5 && month <= 7) {
      if (isWeekend) {
        hours =
          pseudoRandom > 0.85
            ? 0
            : pseudoRandom > 0.5
              ? 8
              : pseudoRandom > 0.2
                ? 6
                : 10
      } else {
        hours = pseudoRandom > 0.4 ? 10 : pseudoRandom > 0.1 ? 8 : 6
      }
    } else {
      // Normal months (Aug - Apr)
      if (isWeekend) {
        // Weekend: 0h (rest), 2h, 4h, or 6h
        hours =
          pseudoRandom > 0.8
            ? 0
            : pseudoRandom > 0.5
              ? 4
              : pseudoRandom > 0.2
                ? 2
                : 6
      } else {
        // Weekdays: 6h to 8h regular, occasional 0h/4h break
        hours =
          pseudoRandom > 0.95
            ? 0
            : pseudoRandom > 0.45
              ? 8
              : pseudoRandom > 0.15
                ? 6
                : 4
      }
    }

    // Level mapping: 0=0h, 1=2h, 2=4h, 3=6h, 4=8h, 5=10h
    let level = 0
    if (hours >= 10) level = 5
    else if (hours >= 8) level = 4
    else if (hours >= 6) level = 3
    else if (hours >= 4) level = 2
    else if (hours >= 2) level = 1
    else level = 0

    activities.push({
      date: dateStr,
      count: hours,
      level,
    })
  }

  return activities
}

export const getGitHubContributions = unstable_cache(
  async () => {
    return generateDailyActivity()
  },
  ["daily-learning-activity-v3"],
  { revalidate: 86400 } // Cache for 1 day
)
