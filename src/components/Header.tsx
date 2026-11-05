import { IconDownload } from "./icons";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="FlexibleFlix — back to top">
          <span className="brand__mark" aria-hidden="true">
            <IconDownload />
          </span>
          <span className="brand__text">
            <span className="brand__name">
              Flexible<span className="brand__accent">Flix</span>
            </span>
            <span className="brand__tagline">Direct downloads &amp; tech updates</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a className="site-nav__link" href="#downloads">
            Downloads
          </a>
          <a className="site-nav__link" href="#how-it-works">
            How it works
          </a>
        </nav>
      </div>
    </header>
  );
}
