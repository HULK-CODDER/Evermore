
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const experiences = [
  {
    number: "01",
    title: "The Golden Letter",
    category: "WORDS, WRITTEN WITH CARE",
    description:
      "A quiet, thoughtful letter made to celebrate a special day with meaningful words and a moment to pause.",
    href: "/experiences/golden-letter",
    status: "AVAILABLE",
    className: "experience-card-golden",
  },
  {
    number: "02",
    title: "Bloom",
    category: "A GIFT THAT FLOWERS",
    description:
      "A delicate botanical experience inspired by flowers, soft colours, and little surprises.",
    href: null,
    status: "COMING SOON",
    className: "experience-card-bloom",
  },
  {
    number: "03",
    title: "Story Arc",
    category: "MOMENTS, WOVEN TOGETHER",
    description:
      "A visual journey through words and meaningful moments worth remembering.",
    href: null,
    status: "COMING SOON",
    className: "experience-card-story",
  },
];

function GoldenLetterArtwork() {
  return (
    <div className="collection-artwork collection-artwork-letter" aria-hidden="true">
      <div className="collection-artwork-label">
        <span>A NOTE FOR YOU</span>
        <span>NO. 001</span>
      </div>

      <div className="collection-letter-stage">
        <div className="collection-letter-halo" />

        <div className="collection-letter-paper">
          <span className="collection-letter-small">
            a little something
          </span>
          <span className="collection-letter-script">
            with care,
          </span>
          <span className="collection-letter-rule" />
          <span className="collection-letter-caption">
            JUST FOR THIS MOMENT
          </span>
        </div>

        <div className="collection-envelope">
          <div className="collection-envelope-back" />
          <div className="collection-envelope-left" />
          <div className="collection-envelope-right" />
          <div className="collection-envelope-front" />
          <div className="collection-envelope-seal">e.</div>
        </div>

        <span className="collection-art-sparkle collection-art-sparkle-one">
          ✳
        </span>
        <span className="collection-art-sparkle collection-art-sparkle-two">
          ✧
        </span>
      </div>

      <div className="collection-artwork-footer">
        <span>SEALED WITH INTENTION</span>
        <Sparkles size={13} strokeWidth={1.2} />
        <span>OPEN WHEN READY</span>
      </div>
    </div>
  );
}

function BloomArtwork() {
  return (
    <div className="collection-artwork collection-artwork-bloom" aria-hidden="true">
      <span className="collection-bloom-caption">
        SOMETHING BEAUTIFUL IS GROWING
      </span>

      <div className="collection-flower-stage">
        <div className="collection-flower-stem" />
        <div className="collection-flower-leaf collection-flower-leaf-one" />
        <div className="collection-flower-leaf collection-flower-leaf-two" />

        <div className="collection-flower-head">
          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              className="collection-flower-petal"
              style={{ "--petal-index": index }}
            />
          ))}
          <span className="collection-flower-center" />
        </div>

        <span className="collection-bloom-sparkle collection-bloom-sparkle-one">
          ✧
        </span>
        <span className="collection-bloom-sparkle collection-bloom-sparkle-two">
          ✳
        </span>
      </div>

      <span className="collection-artwork-number">02 / BLOOM</span>
    </div>
  );
}

function StoryArtwork() {
  return (
    <div className="collection-artwork collection-artwork-story" aria-hidden="true">
      <span className="collection-story-caption">
        EVERY MOMENT LEAVES A TRACE
      </span>

      <div className="collection-story-stage">
        <div className="collection-story-orbit collection-story-orbit-one" />
        <div className="collection-story-orbit collection-story-orbit-two" />

        <div className="collection-story-path">
          <span className="collection-story-point collection-story-point-one" />
          <span className="collection-story-point collection-story-point-two" />
          <span className="collection-story-point collection-story-point-three" />
        </div>

        <div className="collection-story-card collection-story-card-one">
          <span>01</span>
          <i />
          <i />
        </div>

        <div className="collection-story-card collection-story-card-two">
          <span>02</span>
          <i />
          <i />
        </div>

        <span className="collection-story-star">✳</span>
      </div>

      <span className="collection-artwork-number">03 / STORY ARC</span>
    </div>
  );
}

function ExperienceArtwork({ number }) {
  if (number === "01") return <GoldenLetterArtwork />;
  if (number === "02") return <BloomArtwork />;
  return <StoryArtwork />;
}

export default function ExperiencesPage() {
  return (
    <main className="experiences-page collection-page">
      <div className="collection-ambient" aria-hidden="true" />

      <section className="collection-hero">
        <p className="collection-eyebrow">
          <span />
          THE EVERMORE COLLECTION
          <span />
        </p>

        <p className="collection-pretitle">
          A COLLECTION OF LITTLE WORLDS
        </p>

        <h1 className="collection-title">
          More than a moment.
          <br />
          <em>A feeling to keep.</em>
        </h1>

        <p className="collection-intro-copy">
          Each experience begins with a simple idea:
          make someone feel that a moment was made
          especially worth remembering.
        </p>

        <a href="#experience-collection" className="collection-scroll-link">
          <span>MEET THE EXPERIENCES</span>
          <span className="collection-scroll-icon">
            <ArrowDown size={15} strokeWidth={1.4} />
          </span>
        </a>

        <div className="collection-hero-note">
          <span />
          MADE SLOWLY. SHARED THOUGHTFULLY.
        </div>
      </section>

      <section
        className="collection-list-section"
        id="experience-collection"
        aria-label="Evermore experiences"
      >
        <div className="collection-section-heading">
          <div>
            <span className="collection-section-kicker">
              FIND YOUR MOMENT
            </span>
            <h2>Explore the collection</h2>
          </div>

          <span className="collection-section-count">01 — 03</span>
        </div>

        <div className="collection-experience-list">
          {experiences.map((experience) => {
            const available = Boolean(experience.href);

            const artwork = (
              <ExperienceArtwork number={experience.number} />
            );

            const details = (
              <div className="collection-card-content">
                <div className="collection-card-meta">
                  <span
                    className={`collection-card-status ${
                      available ? "is-available" : "is-coming"
                    }`}
                  >
                    {available ? (
                      <span className="collection-status-dot" />
                    ) : (
                      <LockKeyhole size={11} strokeWidth={1.5} />
                    )}
                    {experience.status}
                  </span>

                  <span className="collection-card-number">
                    EXPERIENCE {experience.number}
                  </span>
                </div>

                <p className="collection-card-category">
                  {experience.category}
                </p>

                <h3 className="collection-card-title">
                  {experience.title}
                  {experience.number === "01" && <em>.</em>}
                </h3>

                <p className="collection-card-description">
                  {experience.description}
                </p>

                <div className="collection-card-action">
                  <span>
                    {available
                      ? "Enter the experience"
                      : "A new experience is taking shape"}
                  </span>

                  <span className="collection-card-action-icon">
                    {available ? (
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    ) : (
                      <LockKeyhole size={15} strokeWidth={1.4} />
                    )}
                  </span>
                </div>
              </div>
            );

            if (available) {
              return (
                <Link
                  href={experience.href}
                  key={experience.number}
                  className={`collection-experience-card is-available ${experience.className}`}
                  aria-label={`Open ${experience.title} experience`}
                >
                  <div className="collection-card-art-wrap">
                    {artwork}
                  </div>
                  {details}
                </Link>
              );
            }

            return (
              <article
                key={experience.number}
                className={`collection-experience-card is-coming ${experience.className}`}
                aria-label={`${experience.title}, coming soon`}
              >
                <div className="collection-card-art-wrap">
                  {artwork}
                </div>
                {details}
              </article>
            );
          })}
        </div>
      </section>

      <section className="collection-closing">
        <div className="collection-closing-ornament" aria-hidden="true">
          <span />
          <Sparkles size={15} strokeWidth={1.2} />
          <span />
        </div>

        <p className="collection-closing-kicker">
          THERE IS ALWAYS ROOM FOR A LITTLE WONDER
        </p>

        <h2>
          The best things
          <br />
          are often <em>thoughtful.</em>
        </h2>

        <p>
          This collection is only the beginning.
          More little worlds will find their way here.
        </p>

        <Link href="/" className="collection-home-link">
          <ArrowRight size={15} strokeWidth={1.4} />
          <span>Back to Evermore</span>
        </Link>
      </section>

      <footer className="experiences-footer collection-footer">
        <Link href="/" className="collection-footer-brand">
          evermore<span>.</span>
        </Link>
        <span>MADE WITH CARE, ALWAYS.</span>
        <span>© 2026 EVERMORE</span>
      </footer>
    </main>
  );
}
