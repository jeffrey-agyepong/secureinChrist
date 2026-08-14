import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

const site =
  process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://quietpages-eta.vercel.app";

// The Keystatic admin UI needs on-demand server routes, which requires an
// adapter this static site doesn't have. It's only needed while editing
// locally (`npm run dev`), so keep it out of `astro build`/`astro preview`.
const isDev = process.argv[2] === "dev";

export default defineConfig({
  site,
  integrations: [mdx(), ...(isDev ? [react(), keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()],
  },
});
