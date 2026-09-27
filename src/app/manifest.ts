import type { MetadataRoute } from "next"
import { SITE_CONFIG } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} - Mỹ phẩm Hàn Quốc chính hãng`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "vi",
    icons: [
      {
        src: SITE_CONFIG.icons.default,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
