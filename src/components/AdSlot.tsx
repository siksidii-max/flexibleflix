import { IconSparkle } from "./icons";

type AdSlotProps = {
  variant: "native" | "display";
  /** Stable identifier for reporting or targeting once a network is wired up. */
  slotId: string;
};

/**
 * Inert ad containers. Every slot reserves its exact height before anything
 * loads, so dropping in an ad network tag never shifts the page or covers the
 * download flow. No scripts, iframes or third-party requests are used here.
 */
export function AdSlot({ variant, slotId }: AdSlotProps) {
  if (variant === "display") {
    return (
      <div className="container ad-slot__wrap">
        <aside
          className="ad-slot ad-slot--display"
          data-slot={slotId}
          aria-label="Sponsored display placement"
        >
          <span className="ad-slot__label">Sponsored</span>
          {/* Ad network display tag goes here. 728×90 on desktop, 320×100 on mobile. */}
          <div className="ad-slot__box">
            <span className="ad-slot__box-title">Display banner · 728 × 90</span>
            <span className="ad-slot__box-hint">Reserved space — never overlays content</span>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="ad-slot__wrap">
      <aside
        className="ad-slot ad-slot--native"
        data-slot={slotId}
        aria-label="Sponsored native placement"
      >
        <span className="ad-slot__label">Sponsored</span>
        {/* Ad network native tag goes here. The layout keeps its reserved height. */}
        <span className="ad-slot__thumb" aria-hidden="true">
          <IconSparkle />
        </span>
        <div className="ad-slot__copy">
          <p className="ad-slot__headline">Your native placement goes here</p>
          <p className="ad-slot__support">
            Reserved inside the download flow. Swap in your tag and the layout never moves.
          </p>
        </div>
        <span className="ad-slot__cta">Advertise</span>
      </aside>
    </div>
  );
}
