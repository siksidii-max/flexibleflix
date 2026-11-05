import type { DownloadFile } from "../data/files";
import { formatBytes, formatDate } from "../lib/format";
import { DownloadButton } from "./DownloadButton";
import { IconShield } from "./icons";

type FeaturedDownloadProps = {
  file: DownloadFile;
  onNotify: (message: string) => void;
};

export function FeaturedDownload({ file, onNotify }: FeaturedDownloadProps) {
  return (
    <article className="featured">
      <div className="featured__body">
        <p className="badge badge--accent">
          <span className="badge__dot" aria-hidden="true" />
          Featured download
        </p>

        <h3 className="featured__title">{file.name}</h3>
        <p className="featured__desc">{file.description}</p>

        <ul className="meta-row" aria-label="File details">
          <li className="chip">v{file.version}</li>
          <li className="chip">{file.platform}</li>
          <li className="chip">{formatBytes(file.sizeBytes)}</li>
          <li className="chip chip--muted">Updated {formatDate(file.updatedAt)}</li>
        </ul>
      </div>

      <div className="featured__action">
        <DownloadButton
          file={file}
          onNotify={onNotify}
          label="Download now"
          appearance="primary"
          size="lg"
        />
        <p className="microcopy">
          <IconShield aria-hidden="true" />
          No sign-up. Straight from our server.
        </p>
      </div>
    </article>
  );
}
