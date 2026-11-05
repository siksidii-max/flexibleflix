"""Generate placeholder download files for the FlexibleFlix catalog.

These stand in for real release artifacts. Replace the files in
public/downloads/ with your own and update src/data/files.ts to match.

Run: python3 scripts/generate-samples.py
"""

from __future__ import annotations

import os
import random
import zipfile

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "downloads")


def noise(size: int, seed: int) -> bytes:
    rng = random.Random(seed)
    return rng.randbytes(size)


def write_zip(filename: str, entries: dict[str, bytes]) -> None:
    path = os.path.join(OUT, filename)
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_STORED) as archive:
        for name, payload in entries.items():
            archive.writestr(name, payload)


def readme_bytes(title: str, lines: list[str]) -> bytes:
    body = "\n".join(lines)
    return f"{title}\n{'=' * len(title)}\n\n{body}\n".encode("utf-8")


def pdf_bytes(title: str, lines: list[str]) -> bytes:
    escaped = [line.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)") for line in lines]
    text = ["BT", "/F1 20 Tf", "64 780 Td", f"({title}) Tj", "/F1 11 Tf", "0 -30 Td", "18 TL"]
    text += [f"({line}) Tj" if line else "() Tj" for line in escaped]
    text.append("ET")
    stream = "\n".join(text).encode("latin-1")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
        b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]

    out = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for index, body in enumerate(objects, start=1):
        offsets.append(len(out))
        out += f"{index} 0 obj\n".encode() + body + b"\nendobj\n"

    xref = len(out)
    out += f"xref\n0 {len(objects) + 1}\n".encode()
    out += b"0000000000 65535 f \n"
    for offset in offsets[1:]:
        out += f"{offset:010d} 00000 n \n".encode()
    out += b"trailer\n"
    out += f"<< /Size {len(objects) + 1} /Root 1 0 R >>\n".encode()
    out += f"startxref\n{xref}\n%%EOF\n".encode()

    with open(os.path.join(OUT, "direct-download-playbook.pdf"), "wb") as handle:
        handle.write(bytes(out))


def main() -> None:
    os.makedirs(OUT, exist_ok=True)

    write_zip(
        "flexibleflix-player-win.zip",
        {
            "FlexibleFlixPlayer/README.txt": readme_bytes(
                "FlexibleFlix Player 2.4.1 (Windows)",
                [
                    "Placeholder release build for the FlexibleFlix download demo.",
                    "Unpack, then run FlexibleFlixPlayer.exe.",
                    "",
                    "Requirements: Windows 10 or 11 (64-bit), 4 GB RAM.",
                    "No bundled installers, no toolbars, no background services.",
                ],
            ),
            "FlexibleFlixPlayer/player.exe": noise(2_200_000, 11),
            "FlexibleFlixPlayer/assets/theme.ini": noise(48_000, 12),
        },
    )

    write_zip(
        "flexibleflix-player-mac.zip",
        {
            "FlexibleFlixPlayer.app/README.txt": readme_bytes(
                "FlexibleFlix Player 2.4.1 (macOS)",
                [
                    "Placeholder release build for the FlexibleFlix download demo.",
                    "Drag FlexibleFlixPlayer.app into /Applications.",
                    "",
                    "Requirements: macOS 13 Ventura or newer, Apple silicon or Intel.",
                    "Notarised and signed for the demo catalog.",
                ],
            ),
            "FlexibleFlixPlayer.app/Contents/MacOS/player": noise(1_900_000, 21),
            "FlexibleFlixPlayer.app/Contents/Resources/theme.ini": noise(44_000, 22),
        },
    )

    write_zip(
        "frontend-starter-kit.zip",
        {
            "starter-kit/README.md": readme_bytes(
                "FlexibleFlix Frontend Starter Kit 1.8.0",
                [
                    "A lean Vite + React + TypeScript starting point.",
                    "Includes the FlexibleFlix tokens, base and component stylesheets.",
                    "",
                    "Commands:",
                    "  bun install",
                    "  bun run dev",
                ],
            ),
            "starter-kit/src/main.tsx": readme_bytes(
                "entry",
                [
                    'import { createRoot } from "react-dom/client";',
                    'import App from "./App";',
                    "",
                    'createRoot(document.getElementById("root")!).render(<App />);',
                ],
            ),
            "starter-kit/assets/fonts.dat": noise(1_050_000, 31),
        },
    )

    write_zip(
        "dark-theme-pack.zip",
        {
            "theme-pack/README.txt": readme_bytes(
                "FlexibleFlix Dark Theme Pack 1.3.0",
                [
                    "Ten dark palettes built on the FlexibleFlix design tokens.",
                    "Drop a palette into tokens.css to restyle the whole site.",
                ],
            ),
            "theme-pack/palettes.json": noise(18_000, 41),
            "theme-pack/preview.dat": noise(760_000, 42),
        },
    )

    pdf_bytes(
        "The Direct Download Playbook",
        [
            "FlexibleFlix field guide - edition 2.4",
            "",
            "1. Never gate a download behind a timer.",
            "   A countdown is a tax on trust. Ship the file immediately.",
            "",
            "2. Keep the download on the same origin.",
            "   Same-origin links cannot be swapped for a redirect after the fact,",
            "   and the browser's own download manager handles the transfer.",
            "",
            "3. Reserve every ad slot before the network loads it.",
            "   Fixed heights mean no layout shift and no chance of an overlay",
            "   landing on top of the download button.",
            "",
            "4. Label sponsored placements plainly.",
            "   A muted 'Sponsored' label beats a box that impersonates a button.",
            "",
            "5. Show size, version and date before the click.",
            "   Visitors should never be surprised by what they are saving.",
            "",
            "6. No pop-ups, pop-unders or interstitials. Ever.",
            "   None of them convert better than a download that just works.",
            "",
            "flexibleflix.example - direct downloads, zero detours",
        ],
    )

    notes = [
        "FlexibleFlix Release Notes",
        "Catalog 2.4 - November 2026",
        "",
        "Added",
        "  - Player 2.4.1 for Windows and macOS.",
        "  - Dark theme pack 1.3.0 with ten palettes.",
        "  - Featured download panel with inline progress feedback.",
        "",
        "Changed",
        "  - Ad placements now reserve their exact height before render.",
        "  - File cards show version, size and publish date up front.",
        "",
        "Fixed",
        "  - Download links no longer open a new tab on Safari iOS.",
        "  - Toast announcements are now polite for screen readers.",
        "",
        "Nothing here phones home. No telemetry, no bundled installers.",
    ]
    with open(os.path.join(OUT, "release-notes-2.4.txt"), "w", encoding="utf-8") as handle:
        handle.write("\n".join(notes) + "\n")


if __name__ == "__main__":
    main()
