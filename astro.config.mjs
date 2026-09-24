import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import rehypeExternalLinks from "rehype-external-links";

const site =
  process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://secureinchrist.org";

// @keystatic/astro always injects its admin routes as on-demand (SSR) pages,
// even with Keystatic Cloud storage — so they still require a server adapter
// this static site doesn't have. Keep them out of `astro build`/`astro preview`
// until a real adapter is added (see conversation).
const isDev = process.argv[2] === "dev";

export default defineConfig({
  site,
  markdown: {
    // Only touches absolute (http/https) links, so relative citation links
    // like `./Bible.html` (handled by the Blue Letter Bible widget) are untouched.
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
  },
  integrations: [mdx(), ...(isDev ? [react(), keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()],
  },
});
