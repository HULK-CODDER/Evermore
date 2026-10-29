
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

function Reveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
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
      className={`about-botanical ${className}`}
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 151C60 115 57 79 66 23"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M61 112C36 112 24 97 21 79C42 80 58 91 61 112Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M63 85C83 82 96 68 98 50C79 54 66 66 63 85Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M65 52C43 48 34 32 37 15C54 22 64 34 65 52Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M65 52C79 39 81 25 75 12C64 24 61 38 65 52Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="65"
        cy="51"
        r="3"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="evermore about-page">
      <div className="about-ambient" aria-hidden="true" />
      <div className="about-grain" aria-hidden="true" />

      {/* HERO */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="about-eyebrow">
            <span />
            A NOTE FROM THE CREATOR
            <span />
          </div>

          <p className="about-overline">
            THE STORY BEHIND EVERMORE
          </p>

          <h1 className="about-title">
            A little something,
            <br />
            made with <em>heart.</em>
          </h1>

          <p className="about-intro">
            Every meaningful thing begins with a thought.
            This is the one that became Evermore.
          </p>

          <a href="#the-letter" className="about-scroll-link">
            <span>READ THE STORY</span>
            <ArrowDown size={15} strokeWidth={1.4} />
          </a>
        </motion.div>

        <motion.div
          className="about-hero-art"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15 }}
        >
          <div className="about-art-frame">
            <span className="about-art-index">
              A THOUGHT, PRESERVED
            </span>

            <div className="about-art-center">
              <BotanicalMark />
              <span className="about-art-script">with care,</span>
              <span className="about-art-rule" />
              <span className="about-art-caption">
                SOMETHING TO REMEMBER
              </span>
            </div>

            <Sparkles
              className="about-art-sparkle"
              size={19}
              strokeWidth={1}
            />

            <span className="about-art-number">E. / 001</span>
          </div>
        </motion.div>
      </section>

      {/* THE LETTER */}
      <section className="about-letter" id="the-letter">
        <Reveal className="about-letter-label">
          <span className="about-section-number">01</span>
          <span>THE BEGINNING</span>
        </Reveal>

        <Reveal className="about-letter-content">
          <p className="about-letter-greeting">Dear visitor,</p>

          <h2 className="about-letter-heading">
            It started with a simple thought.
          </h2>

          <p>
            Some moments deserve more than an ordinary message.
            A birthday, a small celebration, or a day when you
            simply want someone to feel appreciated can mean
            so much more when a little thought goes into it.
          </p>

          <p>
            Yet so many of our messages have become quick,
            fleeting things. We send them, read them, and move
            on. Sometimes, I think, the moments that matter
            deserve a little more time.
          </p>

          <p>
            I wanted to create something that could give those
            moments that extra care. Not something extravagant
            for the sake of it, but something thoughtful.
            Something that feels like it was made for a reason.
          </p>
        </Reveal>
      </section>

      {/* THE IDEA */}
      <section className="about-thought">
        <Reveal className="about-thought-inner">
          <span className="about-section-number">
            02 / THE IDEA
          </span>

          <span className="about-quote-mark" aria-hidden="true">
            “
          </span>

          <h2>
            Not just words on a screen,
            <br />
            but a feeling <em>worth keeping.</em>
          </h2>

          <p>
            An experience can be simple and still be special.
            Sometimes, it is the smallest details that make
            something feel personal.
          </p>

          <BotanicalMark />
        </Reveal>
      </section>

      {/* WHAT MATTERS */}
      <section className="about-beliefs">
        <Reveal className="about-beliefs-heading">
          <span className="about-section-number">03</span>
          <p className="about-kicker">WHAT MATTERS TO ME</p>

          <h2>
            A little care
            <br />
            changes <em>everything.</em>
          </h2>
        </Reveal>

        <div className="about-belief-list">
          <Reveal className="about-belief" delay={0.05}>
            <span className="about-belief-index">I.</span>
            <div>
              <h3>Thought over extravagance.</h3>
              <p>
                A meaningful gesture doesn't have to be grand.
                It only has to feel considered.
              </p>
            </div>
          </Reveal>

          <Reveal className="about-belief" delay={0.1}>
            <span className="about-belief-index">II.</span>
            <div>
              <h3>Little details matter.</h3>
              <p>
                The words, the pacing, the smallest visual
                touches — each can make a moment feel different.
              </p>
            </div>
          </Reveal>

          <Reveal className="about-belief" delay={0.15}>
            <span className="about-belief-index">III.</span>
            <div>
              <h3>Make room for the feeling.</h3>
              <p>
                The best experiences leave space to pause,
                appreciate, and enjoy the moment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING NOTE */}
      <section className="about-closing">
        <Reveal className="about-closing-content">
          <span className="about-section-number">A FINAL NOTE</span>

          <h2>
            For the moments
            <br />
            that <em>matter.</em>
          </h2>

          <p>
            That's what Evermore is for. Thoughtful little
            experiences, made to celebrate people and the
            moments we share with them.
          </p>

          <div className="about-signature">
            <span>With care,</span>
            <span className="about-signature-name">
              The creator of Evermore
            </span>
          </div>

          <Link
            href="/experiences"
            className="about-collection-link"
          >
            <span>Explore the experiences</span>
            <ArrowRight size={16} strokeWidth={1.4} />
          </Link>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <Link href="/" className="about-footer-brand">
          evermore<span>.</span>
        </Link>

        <span>A MOMENT, PRESERVED.</span>

        <Link href="/experiences">
          THE COLLECTION ↗
        </Link>
      </footer>

      {/* ABOUT PAGE CSS */}
      <style>{`
        .about-page {
          --about-paper: #f8f5ef;
          --about-ink: #40382f;
          --about-muted: #918678;
          --about-gold: #b49a68;
          --about-line: rgba(139, 119, 87, 0.23);

          position: relative;
          isolation: isolate;
          min-height: 100vh;
          overflow: clip;
          background: var(--about-paper);
          color: var(--about-ink);
        }

        .about-page *,
        .about-page *::before,
        .about-page *::after {
          box-sizing: border-box;
        }

        .about-page .about-ambient {
          position: absolute;
          z-index: -1;
          top: -180px;
          right: -120px;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(205, 183, 140, 0.17),
            transparent 70%
          );
          pointer-events: none;
        }

        .about-page .about-grain {
          position: absolute;
          z-index: 3;
          inset: 0;
          opacity: 0.11;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E");
        }

        .about-page .about-hero,
        .about-page .about-letter,
        .about-page .about-thought,
        .about-page .about-beliefs,
        .about-page .about-closing,
        .about-page .about-footer {
          position: relative;
          z-index: 1;
        }

        .about-page .about-hero {
          width: min(1120px, calc(100% - 64px));
          min-height: 690px;
          margin: 0 auto;
          padding: 95px 0 80px;
          display: grid;
          grid-template-columns: 1fr .82fr;
          align-items: center;
          gap: 72px;
        }

        .about-page .about-hero-content {
          max-width: 570px;
        }

        .about-page .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--about-muted);
          font-size: 9px;
          letter-spacing: .19em;
        }

        .about-page .about-eyebrow > span {
          width: 24px;
          height: 1px;
          background: var(--about-gold);
        }

        .about-page .about-overline,
        .about-page .about-kicker {
          margin: 36px 0 17px;
          color: var(--about-muted);
          font-size: 9px;
          letter-spacing: .2em;
        }

        .about-page .about-title,
        .about-page .about-letter-heading,
        .about-page .about-thought h2,
        .about-page .about-beliefs-heading h2,
        .about-page .about-closing h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          letter-spacing: -.045em;
          line-height: 1.12;
        }

        .about-page .about-title {
          font-size: clamp(42px, 6vw, 76px);
        }

        .about-page .about-title em,
        .about-page .about-thought h2 em,
        .about-page .about-beliefs-heading h2 em,
        .about-page .about-closing h2 em {
          color: var(--about-gold);
          font-weight: 400;
        }

        .about-page .about-intro {
          max-width: 360px;
          margin: 27px 0 0;
          color: var(--about-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .about-page .about-scroll-link {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          margin-top: 37px;
          padding: 0 0 10px;
          border-bottom: 1px solid var(--about-line);
          color: var(--about-ink);
          text-decoration: none;
          font-size: 9px;
          letter-spacing: .16em;
          transition: color 220ms ease, border-color 220ms ease;
        }

        .about-page .about-scroll-link:hover {
          color: var(--about-gold);
          border-color: var(--about-gold);
        }

        .about-page .about-hero-art {
          width: 100%;
          max-width: 400px;
          justify-self: end;
        }

        .about-page .about-art-frame {
          position: relative;
          aspect-ratio: .82;
          padding: 25px;
          border: 1px solid var(--about-line);
        }

        .about-page .about-art-frame::before {
          position: absolute;
          inset: 9px;
          border: 1px solid rgba(139, 119, 87, .13);
          content: "";
          pointer-events: none;
        }

        .about-page .about-art-index,
        .about-page .about-art-number {
          position: absolute;
          z-index: 1;
          color: var(--about-muted);
          font-size: 8px;
          letter-spacing: .15em;
        }

        .about-page .about-art-index {
          top: 27px;
          left: 27px;
        }

        .about-page .about-art-number {
          right: 27px;
          bottom: 27px;
        }

        .about-page .about-art-center {
          position: absolute;
          inset: 55px 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .about-page .about-botanical {
          width: 96px;
          height: 128px;
          color: var(--about-gold);
        }

        .about-page .about-art-script {
          margin-top: 16px;
          color: var(--about-ink);
          font-family: Georgia, serif;
          font-size: 32px;
          font-style: italic;
        }

        .about-page .about-art-rule {
          width: 42px;
          height: 1px;
          margin: 16px 0;
          background: var(--about-gold);
        }

        .about-page .about-art-caption {
          color: var(--about-muted);
          font-size: 8px;
          letter-spacing: .18em;
        }

        .about-page .about-art-sparkle {
          position: absolute;
          top: 28%;
          right: 17%;
          color: var(--about-gold);
        }

        .about-page .about-letter {
          width: min(900px, calc(100% - 48px));
          margin: 0 auto;
          padding: 115px 0 130px;
          display: grid;
          grid-template-columns: .65fr 1.35fr;
          gap: 70px;
          border-top: 1px solid var(--about-line);
          scroll-margin-top: 30px;
        }

        .about-page .about-letter-label {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: var(--about-muted);
          font-size: 9px;
          letter-spacing: .16em;
        }

        .about-page .about-section-number {
          display: block;
          color: var(--about-gold);
          font-size: 9px;
          letter-spacing: .17em;
        }

        .about-page .about-letter-content {
          max-width: 540px;
        }

        .about-page .about-letter-greeting {
          margin: 0 0 26px;
          font-family: Georgia, serif;
          font-size: 27px;
          font-style: italic;
        }

        .about-page .about-letter-heading {
          margin-bottom: 28px;
          font-size: clamp(33px, 4vw, 47px);
        }

        .about-page .about-letter-content > p:not(.about-letter-greeting) {
          margin: 0 0 20px;
          color: #786e61;
          font-size: 14px;
          line-height: 2.05;
        }

        .about-page .about-thought {
          padding: 110px 24px 100px;
          background: #f0ebe2;
          text-align: center;
        }

        .about-page .about-thought-inner {
          width: min(740px, 100%);
          margin: 0 auto;
        }

        .about-page .about-quote-mark {
          display: block;
          height: 65px;
          margin-top: 28px;
          color: var(--about-gold);
          font-family: Georgia, serif;
          font-size: 100px;
          line-height: 1;
        }

        .about-page .about-thought h2 {
          font-size: clamp(34px, 5vw, 55px);
        }

        .about-page .about-thought-inner > p {
          max-width: 420px;
          margin: 25px auto 28px;
          color: var(--about-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .about-page .about-thought .about-botanical {
          width: 53px;
          height: 70px;
          opacity: .8;
        }

        .about-page .about-beliefs {
          width: min(950px, calc(100% - 48px));
          margin: 0 auto;
          padding: 125px 0 135px;
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 85px;
        }

        .about-page .about-beliefs-heading .about-kicker {
          margin-top: 23px;
        }

        .about-page .about-beliefs-heading h2 {
          font-size: clamp(38px, 4.7vw, 57px);
        }

        .about-page .about-belief-list {
          padding-top: 8px;
        }

        .about-page .about-belief {
          display: grid;
          grid-template-columns: 38px 1fr;
          gap: 18px;
          padding: 24px 0;
          border-bottom: 1px solid var(--about-line);
        }

        .about-page .about-belief:first-child {
          padding-top: 0;
        }

        .about-page .about-belief-index {
          padding-top: 4px;
          color: var(--about-gold);
          font-family: Georgia, serif;
          font-size: 15px;
          font-style: italic;
        }

        .about-page .about-belief h3 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: 400;
        }

        .about-page .about-belief p {
          margin: 10px 0 0;
          color: var(--about-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .about-page .about-closing {
          padding: 105px 24px 115px;
          border-top: 1px solid var(--about-line);
          text-align: center;
        }

        .about-page .about-closing-content {
          width: min(610px, 100%);
          margin: 0 auto;
        }

        .about-page .about-closing h2 {
          margin-top: 28px;
          font-size: clamp(45px, 6vw, 70px);
        }

        .about-page .about-closing-content > p {
          max-width: 410px;
          margin: 23px auto 0;
          color: var(--about-muted);
          font-size: 13px;
          line-height: 1.95;
        }

        .about-page .about-signature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 35px;
          color: var(--about-muted);
          font-family: Georgia, serif;
          font-size: 15px;
          font-style: italic;
        }

        .about-page .about-signature-name {
          color: var(--about-ink);
          font-size: 20px;
        }

        .about-page .about-collection-link {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          margin-top: 35px;
          padding: 15px 20px;
          border: 1px solid var(--about-line);
          color: var(--about-ink);
          text-decoration: none;
          font-size: 10px;
          letter-spacing: .08em;
          transition: background 220ms ease, border-color 220ms ease;
        }

        .about-page .about-collection-link:hover {
          border-color: var(--about-gold);
          background: rgba(180, 154, 104, .07);
        }

        .about-page .about-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 25px max(32px, calc((100% - 1120px) / 2));
          border-top: 1px solid var(--about-line);
          color: var(--about-muted);
          font-size: 8px;
          letter-spacing: .13em;
        }

        .about-page .about-footer a {
          color: inherit;
          text-decoration: none;
        }

        .about-page .about-footer .about-footer-brand {
          color: var(--about-ink);
          font-family: Georgia, serif;
          font-size: 23px;
          letter-spacing: -.06em;
        }

        .about-page .about-footer-brand span {
          color: var(--about-gold);
        }

        .about-page .about-footer a:hover {
          color: var(--about-gold);
        }

        @media (max-width: 800px) {
          .about-page .about-hero {
            min-height: auto;
            padding: 90px 0 80px;
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .about-page .about-hero-content {
            max-width: 620px;
          }

          .about-page .about-hero-art {
            width: min(350px, 85%);
            justify-self: center;
          }

          .about-page .about-art-frame {
            aspect-ratio: .95;
          }

          .about-page .about-letter {
            padding: 80px 0 90px;
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .about-page .about-beliefs {
            padding: 90px 0 100px;
            grid-template-columns: 1fr;
            gap: 45px;
          }
        }

        @media (max-width: 520px) {
          .about-page .about-hero {
            width: calc(100% - 40px);
            padding-top: 70px;
            gap: 42px;
          }

          .about-page .about-eyebrow {
            gap: 8px;
            font-size: 8px;
            letter-spacing: .13em;
          }

          .about-page .about-eyebrow > span {
            width: 15px;
          }

          .about-page .about-overline {
            margin-top: 28px;
            font-size: 8px;
          }

          .about-page .about-title {
            font-size: clamp(42px, 11vw, 58px);
          }

          .about-page .about-intro {
            font-size: 13px;
          }

          .about-page .about-art-frame {
            aspect-ratio: .9;
          }

          .about-page .about-letter {
            width: calc(100% - 40px);
            padding: 65px 0 75px;
            gap: 27px;
          }

          .about-page .about-letter-content > p:not(.about-letter-greeting) {
            font-size: 13px;
            line-height: 1.95;
          }

          .about-page .about-thought {
            padding: 75px 22px;
          }

          .about-page .about-thought h2 {
            font-size: 34px;
          }

          .about-page .about-beliefs {
            width: calc(100% - 40px);
            padding: 75px 0 85px;
          }

          .about-page .about-belief h3 {
            font-size: 20px;
          }

          .about-page .about-closing {
            padding: 75px 22px 85px;
          }

          .about-page .about-footer {
            flex-wrap: wrap;
            padding: 22px 20px;
            font-size: 7px;
          }

          .about-page .about-footer > span {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-page *,
          .about-page *::before,
          .about-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
