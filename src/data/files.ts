export type DownloadKind = "app" | "kit" | "doc" | "theme" | "notes";

export type DownloadFile = {
  id: string;
  name: string;
  version: string;
  platform: string;
  kind: DownloadKind;
  sizeBytes: number;
  /** ISO date (YYYY-MM-DD) of the last publish. */
  updatedAt: string;
  description: string;
  href: string;
  featured: boolean;
};

/**
 * The download catalog. To change what FlexibleFlix offers, drop the real
 * release files into `public/downloads/` and edit the entries below — nothing
 * else in the UI needs to change.
 */
export const downloads: DownloadFile[] = [
  {
    id: "player-win",
    name: "FlexibleFlix Player for Windows",
    version: "2.4.1",
    platform: "Windows 10/11",
    kind: "app",
    sizeBytes: 2_248_724,
    updatedAt: "2026-11-02",
    description:
      "The desktop player: offline queue, hardware decoding and a dark UI built for long sessions. Unpack and run — no installer, no bundled extras.",
    href: "/downloads/flexibleflix-player-win.zip",
    featured: true,
  },
  {
    id: "player-mac",
    name: "FlexibleFlix Player for macOS",
    version: "2.4.1",
    platform: "macOS 13+",
    kind: "app",
    sizeBytes: 1_944_794,
    updatedAt: "2026-11-02",
    description:
      "The same player, notarised for Apple silicon and Intel. Drag it into Applications and you are done.",
    href: "/downloads/flexibleflix-player-mac.zip",
    featured: false,
  },
  {
    id: "starter-kit",
    name: "Frontend Starter Kit",
    version: "1.8.0",
    platform: "Any platform",
    kind: "kit",
    sizeBytes: 1_050_779,
    updatedAt: "2026-10-27",
    description:
      "A lean Vite + React + TypeScript starting point, including the FlexibleFlix design tokens and stylesheets.",
    href: "/downloads/frontend-starter-kit.zip",
    featured: false,
  },
  {
    id: "dark-theme-pack",
    name: "Dark Theme Pack",
    version: "1.3.0",
    platform: "Any platform",
    kind: "theme",
    sizeBytes: 778_572,
    updatedAt: "2026-10-19",
    description:
      "Ten dark palettes built on the same token set. Swap one block of CSS variables to restyle a whole project.",
    href: "/downloads/dark-theme-pack.zip",
    featured: false,
  },
  {
    id: "playbook",
    name: "The Direct Download Playbook",
    version: "2.4",
    platform: "PDF",
    kind: "doc",
    sizeBytes: 1_619,
    updatedAt: "2026-09-30",
    description:
      "Our short field guide to download pages that respect visitors: no timers, no gates, no overlays.",
    href: "/downloads/direct-download-playbook.pdf",
    featured: false,
  },
  {
    id: "release-notes",
    name: "Release Notes 2.4",
    version: "2.4",
    platform: "Plain text",
    kind: "notes",
    sizeBytes: 529,
    updatedAt: "2026-11-03",
    description:
      "What shipped in the latest catalog update, in a file you can keep offline. No telemetry, no bundled installers.",
    href: "/downloads/release-notes-2.4.txt",
    featured: false,
  },
];

export const featuredDownload: DownloadFile =
  downloads.find((file) => file.featured) ?? downloads[0];

export const catalogStats = {
  fileCount: downloads.length,
  totalBytes: downloads.reduce((total, file) => total + file.sizeBytes, 0),
  lastUpdated: downloads.reduce(
    (latest, file) => (file.updatedAt > latest ? file.updatedAt : latest),
    downloads[0].updatedAt,
  ),
};
