import type { ComponentType } from "react";
import type { DownloadFile, DownloadKind } from "../data/files";
import { formatBytes, formatDate } from "../lib/format";
import { DownloadButton } from "./DownloadButton";
import {
  IconDocument,
  IconLayers,
  IconNotes,
  IconSparkle,
  IconWindow,
  type IconProps,
} from "./icons";

const KIND_ICONS: Record<DownloadKind, ComponentType<IconProps>> = {
  app: IconWindow,
  kit: IconLayers,
  doc: IconDocument,
  theme: IconSparkle,
  notes: IconNotes,
};

const KIND_LABELS: Record<DownloadKind, string> = {
  app: "Application",
  kit: "Starter kit",
  doc: "Document",
  theme: "Theme pack",
  notes: "Release notes",
};

type DownloadCardProps = {
  file: DownloadFile;
  onNotify: (message: string) => void;
};

export function DownloadCard({ file, onNotify }: DownloadCardProps) {
  const KindIcon = KIND_ICONS[file.kind];

  return (
    <article className="file-card">
      <div className="file-card__top">
        <span className="file-card__icon" aria-hidden="true">
          <KindIcon />
        </span>
        <span className="badge">{KIND_LABELS[file.kind]}</span>
      </div>

      <div className="file-card__heading">
        <h3 className="file-card__title">{file.name}</h3>
        <span className="version">v{file.version}</span>
      </div>

      <p className="file-card__desc">{file.description}</p>

      <dl className="file-card__meta">
        <div>
          <dt>Size</dt>
          <dd>{formatBytes(file.sizeBytes)}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{formatDate(file.updatedAt)}</dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>{file.platform}</dd>
        </div>
      </dl>

      <DownloadButton file={file} onNotify={onNotify} appearance="outline" label="Download" />
    </article>
  );
}
