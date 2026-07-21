import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Focuscreen",
    short_name: "Focuscreen",
    description: "A calm daily goal, task, and focus timer dashboard.",
    start_url: "/",
    display: "standalone",
    background_color: "#071525",
    theme_color: "#071525",
    icons: [{ src: "/icon.png", sizes: "485x485", type: "image/png" }],
  };
}