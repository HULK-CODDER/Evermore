
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

function EnvelopeArtwork({ reduceMotion }) {
  return (
    <div className="home-artwork" aria-hidden="true">
      <div className="home-artwork-topline">
        <span>A NOTE FOR YOU</span>
        <span>NO. 001</span>
      </div>

      <div className="home-artwork-stage">
        <motion.div
          className="home-artwork-halo"
          animate={
            reduceMotion
              ? {}
              : { scale: [1, 1.035, 1], opacity: [0.55, 0.8, 0.55] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="home-artwork-letter"
          animate={reduceMotion ? {} : { y: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="home-letter-top">a little something</span>
          <span className="home-letter-script">with care,</span>
          <span className="home-letter-rule" />
          <span className="home-letter-bottom">JUST FOR THIS MOMENT</span>
        </motion.div>

        <div className="home-artwork-envelope">
          <div className="home-envelope-back" />
          <div className="home-envelope-paper" />
          <div className="home-envelope-left" />
          <div className="home-envelope-right" />
          <div className="home-envelope-front" />
          <div className="home-envelope-seal">
            <span>e.</span>
          </div>
        </div>

        <motion.span
          className="home-artwork-sparkle home-artwork-sparkle-one"
          animate={reduceMotion ? {} : { rotate: [0, 18, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ✳
        </motion.span>

        <motion.span
          className="home-artwork-sparkle home-artwork-sparkle-two"
          animate={reduceMotion ? {} : { rotate: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✧
        </motion.span>

        <span className="home-artwork-orbit home-artwork-orbit-one" />
        <span className="home-artwork-orbit home-artwork-orbit-two" />
      </div>

      <div className="home-artwork-bottomline">
        <span>SEALED WITH INTENTION</span>
        <Sparkles size={13} strokeWidth={1.2} />
        <span>OPEN WHEN READY</span>
      </div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  const enterMotion = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.75,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <main className="evermore home-page">
      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <section className="home-hero">
        <motion.div className="home-intro" {...enterMotion(0.1)}>
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" />
            A LITTLE WORLD, MADE WITH CARE
            <span className="home-eyebrow-line" />
          </div>

          <p className="home-overline">
            SMALL GESTURES. MEANINGFUL MOMENTS.
          </p>

          <h1 className="home-title">
            Some moments
            <br />
            deserve to be
            <br />
            <em>remembered.</em>
          </h1>

          <p className="home-description">
            Thoughtful words, little surprises, and
            experiences created to make a special day
            feel a little more extraordinary.
          </p>

          <Link
            href="/experiences"
            className="home-primary-link"
          >
            <span>Explore the collection</span>
            <span className="home-primary-icon">
              <ArrowDown size={16} strokeWidth={1.5} />
            </span>
          </Link>

          <div className="home-intro-note">
            <span className="home-note-dot" />
            MADE FOR MOMENTS THAT MATTER
          </div>
        </motion.div>

        <motion.section
          className="home-feature"
          {...enterMotion(0.25)}
          aria-labelledby="home-feature-title"
        >
          <Link
            href="/experiences/golden-letter"
            className="home-feature-card"
            aria-label="Open The Golden Letter experience"
          >
            <div className="home-feature-art-wrap">
              <EnvelopeArtwork reduceMotion={reduceMotion} />

              <span className="home-feature-index">
                EXPERIENCE <span>01</span>
              </span>
            </div>

            <div className="home-feature-content">
              <div className="home-feature-meta">
                <span className="home-feature-status">
                  <span />
                  AVAILABLE NOW
                </span>
                <span className="home-feature-edition">
                  THE KEEPSAKE SERIES
                </span>
              </div>

              <h2 id="home-feature-title">
                The Golden
                <br className="home-feature-title-break" />
                <em>Letter.</em>
              </h2>

              <p className="home-feature-description">
                A thoughtful message, wrapped in a little
                wonder, waiting to be opened.
              </p>

              <div className="home-feature-action">
                <span>Enter the experience</span>
                <span className="home-feature-arrow">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </Link>

          <p className="home-feature-caption">
            <span>01 / 03</span>
            A SMALL THING, MADE WITH HEART.
          </p>
        </motion.section>

        <motion.div
          className="home-scroll-note"
          {...enterMotion(0.5)}
        >
          <span>TAKE YOUR TIME</span>
          <span className="home-scroll-line" />
          <span>THERE IS NO RUSH</span>
        </motion.div>
      </section>

      <section className="home-collection" id="about">
        <div className="home-collection-heading">
          <p className="home-section-kicker">THE IDEA BEHIND EVERMORE</p>
          <h2>
            Made to feel
            <br />
            <em>a little more personal.</em>
          </h2>
          <p>
            Not just another page on a screen. A collection
            of small, thoughtful experiences designed to
            turn an ordinary moment into something worth
            keeping.
          </p>
        </div>

        <Link
          href="/experiences"
          className="home-collection-link"
        >
          <span>Discover all experiences</span>
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </section>

      <footer className="home-footer">
        <Link href="/" className="home-footer-brand">
          evermore<span>.</span>
        </Link>

        <span className="home-footer-message">
          A MOMENT, PRESERVED.
        </span>

        <span className="home-footer-copyright">
          © 2026 EVERMORE
        </span>
      </footer>
    </main>
  );
}
