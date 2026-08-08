import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://exekartik.vercel.app",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/exekartik/exeKartik/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route | string>[] = [
  {
    title: "Resume",
    href: "/resume",
  },
  {
    title: "Work",
    href: "/#work",
  },
  {
    title: "Blogs",
    href: "/blog",
  },
  {
    title: "Community",
    href: "/community",
  },
]

export const MOBILE_NAV: NavItem<Route | string>[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "exekartik/exeKartik"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/exekartik/exeKartik"

export const SPONSORSHIP_URL = "https://github.com/sponsors/exekartik"

export const UTM_PARAMS = {
  utm_source: "exekartik",
}
