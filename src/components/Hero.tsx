import { catalogStats, type DownloadFile } from "../data/files";
import { formatBytes, formatDate } from "../lib/format";
import { DownloadButton } from "./DownloadButton";
import { IconChevronDown, IconShield } from "./icons";

type HeroProps = {
  featured: DownloadFile;
  onNotify: (message: string) => void;
};

export function Hero({ featured, onNotify }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          New · Player {featured.version} is live
        </p>

        <h1 className="hero__title">
          Direct downloads.
          <br />
          <span className="hero__accent">Zero detours.</span>
        </h1>

        <p className="hero__lede">
          FlexibleFlix is the hub for direct file downloads and tech updates. Pick a file,
          click once, and it lands on your device — no redirects, no pop-ups, no sign-up
          wall between you and the download.
        </p>

        <div className="hero__actions">
          <DownloadButton
            file={featured}
            onNotify={onNotify}
            label="Download now"
            appearance="primary"
            size="lg"
          />
          <a className="btn btn--ghost btn--lg" href="#downloads">
            Browse all {catalogStats.fileCount} files
            <IconChevronDown aria-hidden="true" />
          </a>
        </div>

        <p className="microcopy hero__reassurance">
          <IconShield aria-hidden="true" />
          Direct from our server — no redirects, no pop-ups, no waiting.
        </p>

        <dl className="hero__stats">
          <div className="hero__stat">
            <dt>Files available</dt>
            <dd>{catalogStats.fileCount}</dd>
          </div>
          <div className="hero__stat">
            <dt>Total size</dt>
            <dd>{formatBytes(catalogStats.totalBytes)}</dd>
          </div>
          <div className="hero__stat">
            <dt>Last updated</dt>
            <dd>{formatDate(catalogStats.lastUpdated)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
