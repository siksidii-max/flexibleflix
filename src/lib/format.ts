const BYTE_UNITS = ["KB", "MB", "GB", "TB"] as const;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < BYTE_UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const rounded = value >= 100 ? Math.round(value).toString() : value.toFixed(1);
  return `${rounded} ${BYTE_UNITS[unitIndex]}`;
}

export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
