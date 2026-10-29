
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

import Envelope from "../../components/golden-letter/Envelope";
import Letter from "../../components/golden-letter/Letter";

function OpeningScene({ onOpen }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className="evermore golden-letter-opening"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.99, filter: "blur(3px)" }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <section className="golden-opening-hero">
        <motion.div
          className="golden-opening-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="golden-opening-edition">
            <span className="golden-opening-edition-line" />
            <span>A SMALL KEEPSAKE</span>
            <span className="golden-opening-edition-line" />
          </div>

          <p className="golden-opening-date">
            NOVEMBER 10 <span>·</span> A DAY TO CELEBRATE
          </p>

          <h1 className="golden-opening-title">
            For a day
            <br />
            <em>all your own.</em>
          </h1>

          <p className="golden-opening-description">
            A little corner of the world, made just for this
            occasion. A few thoughtful words, a quiet moment,
            and a wish for the year ahead to bring beautiful things.
          </p>

          <div className="golden-opening-ornament" aria-hidden="true">
            <span />
            <Sparkles size={14} strokeWidth={1.25} />
            <span />
          </div>
        </motion.div>

        <motion.div
          className="golden-opening-envelope"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 1.05,
            delay: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Envelope onOpen={onOpen} />
        </motion.div>

        <motion.div
          className="golden-opening-invitation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.85,
          }}
        >
          <span className="golden-opening-invitation-line" />
          <span>WHENEVER YOU'RE READY</span>
          <ArrowDown size={13} strokeWidth={1.3} />
        </motion.div>

        <div className="golden-opening-bottom" aria-hidden="true">
          <span>NO RUSH, NO EXPECTATIONS</span>
          <span className="golden-opening-bottom-divider" />
          <span>JUST A LITTLE SOMETHING</span>
        </div>
      </section>

      <footer className="golden-opening-footer">
        <span className="golden-opening-footer-brand">
          evermore<span>.</span>
        </span>
        <span>A MOMENT, PRESERVED.</span>
        <span>© 2026</span>
      </footer>
    </motion.main>
  );
}

export default function GoldenLetterPage() {
  const [showLetter, setShowLetter] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {showLetter ? (
        <motion.div
          key="letter"
          className="experience-transition"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 12, filter: "blur(2px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Letter />
        </motion.div>
      ) : (
        <OpeningScene
          key="opening"
          onOpen={() => setShowLetter(true)}
        />
      )}
    </AnimatePresence>
  );
}
