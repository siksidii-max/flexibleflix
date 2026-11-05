import { useEffect, useRef, useState } from "react";
import type { DownloadFile } from "../data/files";
import { formatBytes } from "../lib/format";
import { IconCheck, IconDownload } from "./icons";

type DownloadButtonProps = {
  file: DownloadFile;
  onNotify: (message: string) => void;
  label?: string;
  appearance?: "primary" | "outline";
  size?: "md" | "lg";
};

type Phase = "idle" | "saving" | "saved";

export function DownloadButton({
  file,
  onNotify,
  label = "Download",
  appearance = "primary",
  size = "md",
}: DownloadButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  function handleClick() {
    if (phase === "saving") return;

    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [
      window.setTimeout(() => setPhase("saved"), 1200),
      window.setTimeout(() => setPhase("idle"), 4200),
    ];

    setPhase("saving");
    onNotify(`Saving ${file.name} — check your downloads folder.`);
  }

  return (
    <a
      className={`btn download-btn btn--${appearance} btn--${size}`}
      href={file.href}
      download
      data-phase={phase}
      aria-label={`Download ${file.name} (version ${file.version}, ${formatBytes(
        file.sizeBytes,
      )})`}
      onClick={handleClick}
    >
      <span className="download-btn__icon" aria-hidden="true">
        {phase === "saving" ? (
          <span className="spinner" />
        ) : phase === "saved" ? (
          <IconCheck />
        ) : (
          <IconDownload />
        )}
      </span>
      <span className="download-btn__label">
        {phase === "saving" ? "Saving…" : phase === "saved" ? "Saved" : label}
      </span>
    </a>
  );
}
