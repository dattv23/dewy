import type { MetadataRoute } from "next"
import { absoluteUrl, SITE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/dang-nhap",
        "/dang-ky",
        "/gio-hang",
        "/tai-khoan",
        "/thanh-toan",
        "/tra-cuu",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  }
}
