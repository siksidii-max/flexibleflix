import { IconDownload, IconShield, IconSparkle } from "./icons";

const STEPS = [
  {
    icon: IconDownload,
    title: "Direct server link",
    body: "Every button points straight at the file on our own origin. Your browser saves it — you stay right here on the page.",
  },
  {
    icon: IconSparkle,
    title: "No intermediate pages",
    body: "No countdowns, no “continue to download” screens, no fake buttons. One click, one file, done.",
  },
  {
    icon: IconShield,
    title: "No sign-up, no prompts",
    body: "No accounts, no email walls, no overlays. The only thing that pops up is a small toast confirming the save.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="section how" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow eyebrow--muted">Safe by design</p>
            <h2 className="section-title" id="how-title">
              How downloads work
            </h2>
          </div>
          <p className="section-sub">
            Three rules we do not break. They are the reason there is nothing to click
            through before the file arrives.
          </p>
        </div>

        <ul className="how__list">
          {STEPS.map(({ icon: StepIcon, title, body }, index) => (
            <li className="how__item" key={title}>
              <span className="how__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="how__icon" aria-hidden="true">
                <StepIcon />
              </span>
              <h3 className="how__title">{title}</h3>
              <p className="how__body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
