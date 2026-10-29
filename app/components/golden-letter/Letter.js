
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";


function Reveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 22 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}


function BotanicalMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 150C59 118 63 88 53 53C49 38 41 26 30 14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M58 110C34 109 21 94 21 76C42 79 56 92 58 110Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M59 85C81 80 95 63 94 44C74 51 62 65 59 85Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M51 57C35 53 28 42 30 29C44 35 51 44 51 57Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M29 14C29 14 32 6 40 7C42 15 35 19 29 14Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M59 130C78 128 90 116 93 100C75 104 63 114 59 130Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Divider() {
  return (
    <div className="story-divider" aria-hidden="true">
      <span />
      <span className="story-divider-star">✳</span>
      <span />
    </div>
  );
}

export default function Letter() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const botanicalY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -65]
  );

  const botanicalRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 8]
  );

  return (
    <motion.main
      id="top"
      ref={containerRef}
      className="letter-experience"
    >
      <div className="letter-grain" aria-hidden="true" />

      <div
        className="reading-progress"
        aria-label="Reading progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          style={{
            scaleX: progress,
            transformOrigin: "left center",
          }}
        />
      </div>

      <header className="story-header">
        <Link href="/" className="wordmark" aria-label="Evermore home">
          evermore<span>.</span>
        </Link>

        <span className="story-header-note">THE GOLDEN LETTER</span>

        <span className="story-header-date">10 · 11</span>
      </header>

      {/* Opening */}
      <section className="story-section story-opening">
        <motion.div
          className="story-botanical botanical-opening"
          style={{ y: botanicalY, rotate: botanicalRotate }}
          aria-hidden="true"
        >
          <BotanicalMark />
        </motion.div>

        <Reveal className="story-opening-copy">
          <p className="story-eyebrow">
            A LITTLE NOTE FOR A SPECIAL DAY
          </p>

          <p className="story-small-date">NOVEMBER 10</p>

          <h1 className="story-title">
            Dear <em>Lipsy,</em>
          </h1>

          <Divider />

          <p className="story-lead">
            Some days deserve to be celebrated.
            Some people deserve a little extra kindness.
            And some wishes are worth putting into words.
          </p>
        </Reveal>


<a
  className="story-scroll-cue"
  href="#appreciation"
  aria-label="Continue reading the birthday letter"
>
  <span>THERE'S MORE TO THIS NOTE</span>
  <motion.span
    className="scroll-cue-line"
    animate={
      reduceMotion
        ? undefined
        : { scaleY: [0.55, 1, 0.55], opacity: [0.5, 1, 0.5] }
    }
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
  <span className="scroll-cue-arrow" aria-hidden="true">
    ↓
  </span>
</a>

     
      </section>

      {/* Appreciation */}
      <section
  id="appreciation"
  className="story-section story-appreciation "
>
        <div className="story-side-label" aria-hidden="true">
          <span>01</span>
          <span />
          <span>A FEW WORDS</span> 
        </div>

        <Reveal className="story-card">
          <p className="story-eyebrow">A THOUGHT TO KEEP</p>

          <h2>
            The world is made
            <br />
            of little <em>things.</em>
          </h2>

          <p className="story-paragraph">
            A kind word. An unexpected smile.
            A moment that makes an ordinary day
            feel a little brighter.
          </p>

          <p className="story-paragraph">
            It is often these small things that stay
            with us the longest, quietly reminding us
            that beauty can be found in the simplest
            parts of life.
          </p>

          <div className="story-card-ornament" aria-hidden="true">
            ✳
          </div>
        </Reveal>

        <motion.div
          className="story-floating-mark"
          style={{ y: botanicalY, rotate: botanicalRotate }}
          aria-hidden="true"
        >
          <BotanicalMark />
        </motion.div>
      </section>

      {/* Birthday wishes */}
      <section className="story-section story-wishes">
        <Reveal className="story-wishes-copy">
          <p className="story-eyebrow">FOR THE YEAR AHEAD</p>

          <h2>
            May life bring you
            <br />
            more <em>beautiful things.</em>
          </h2>

          <p className="story-wishes-intro">
            A few little wishes for the chapters yet to come.
          </p>

          <div className="wish-list">
            <article className="wish-item">
              <span className="wish-number">I.</span>
              <div>
                <h3>Joy that feels effortless</h3>
                <p>
                  The kind found in little surprises,
                  favourite moments, and unexpected laughter.
                </p>
              </div>
            </article>

            <article className="wish-item">
              <span className="wish-number">II.</span>
              <div>
                <h3>Peace in the busy moments</h3>
                <p>
                  Space to breathe, time for yourself,
                  and the comfort of knowing you are doing enough.
                </p>
              </div>
            </article>

            <article className="wish-item">
              <span className="wish-number">III.</span>
              <div>
                <h3>Dreams finding their way to you</h3>
                <p>
                  New possibilities, meaningful beginnings,
                  and plenty of reasons to believe in tomorrow.
                </p>
              </div>
            </article>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="story-section story-closing">
        <motion.div
          className="closing-flower"
          style={{ y: botanicalY, rotate: botanicalRotate }}
          aria-hidden="true"
        >
          <BotanicalMark />
        </motion.div>

        <Reveal className="closing-copy">
          <p className="story-eyebrow">
            AND BEFORE THIS NOTE ENDS
          </p>

          <h2>
            Happy
            <br />
            <em>Birthday,</em>
            <br />
            Lipsy.
          </h2>

          <Divider />

          <p className="closing-message">
            May the coming year be gentle with you,
            generous with its happiness, and full of
            moments you will look back on with a smile.
          </p>

          <p className="closing-signature">With warm wishes</p>

          <div className="closing-seal" aria-hidden="true">
            e.
          </div>

          <p className="closing-footnote">
            MADE WITH CARE · EVERMORE
          </p>
        </Reveal>
      </section>

      <footer className="story-footer">
        <span>EVERMORE © 2026</span>
        <span>A LITTLE MOMENT, PRESERVED.</span>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: reduceMotion ? "auto" : "smooth",
            });
          }}
        >
          BACK TO THE BEGINNING ↑
        </a>
      </footer>
    </motion.main>
  );
}
