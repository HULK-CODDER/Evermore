
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimate,
  useReducedMotion,
} from "motion/react";

export default function Envelope({ onOpen }) {
  const [scope, animate] = useAnimate();
  const [isOpening, setIsOpening] = useState(false);
  const openingRef = useRef(false);
  const reduceMotion = useReducedMotion();

  async function openLetter() {
    if (openingRef.current) return;

    openingRef.current = true;
    setIsOpening(true);

    try {
      if (reduceMotion) {
        onOpen();
        return;
      }

      // 1. Release the seal.
      await animate(
        "[data-seal]",
        {
          opacity: 0,
          scale: 0.65,
          y: -9,
          rotate: -12,
        },
        {
          duration: 0.3,
          ease: "easeIn",
        }
      );

      // 2. Open the envelope flap.
      await animate(
        "[data-flap]",
        {
          rotateX: -180,
        },
        {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }
      );

      // 3. Lift the letter above the envelope pocket.
      await animate(
        "[data-letter]",
        {
          y: -155,
          scale: 1.025,
          zIndex: 5,
        },
        {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }
      );

      // 4. Transition into the full letter experience.
      await animate(
        "[data-envelope-scene]",
        {
          opacity: 0,
          y: -12,
          scale: 0.985,
        },
        {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }
      );

      onOpen();
    } catch {
      // Preserve access to the letter if an animation fails.
      onOpen();
    }
  }

  return (
    <div ref={scope} className="envelope-stage">
      <motion.div
        data-envelope-scene
        className="envelope-wrap"
        initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.button
          type="button"
          className="envelope"
          onClick={openLetter}
          disabled={isOpening}
          aria-label="Open your birthday letter"
          aria-busy={isOpening}
          whileHover={
            isOpening || reduceMotion ? undefined : { y: -4 }
          }
          whileTap={
            isOpening || reduceMotion ? undefined : { scale: 0.99 }
          }
        >
          <span className="envelope-shadow" aria-hidden="true" />
          <span className="envelope-back" aria-hidden="true" />

          <motion.span
            data-letter
            className="letter-preview"
            aria-hidden="true"
          >
            <span className="letter-preview-kicker">
              A LITTLE SOMETHING FOR YOU
            </span>

            <span className="letter-preview-title">
              For Lipsy,
            </span>

            <span className="letter-preview-line" />

            <span className="letter-preview-date">
              November 10
            </span>
          </motion.span>

          <span className="envelope-pocket" aria-hidden="true" />

          <motion.span
            data-flap
            className="envelope-flap"
            aria-hidden="true"
          />

          <motion.span
            data-seal
            className="envelope-seal"
            aria-hidden="true"
          >
            <span>e.</span>
          </motion.span>
        </motion.button>

        <motion.p
          className="envelope-hint"
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.7,
            duration: reduceMotion ? 0 : 0.65,
          }}
        >
          A letter, made just for this moment
        </motion.p>

        <motion.button
          className="open-letter-link"
          type="button"
          disabled={isOpening}
          onClick={openLetter}
          whileHover={
            isOpening || reduceMotion
              ? undefined
              : { letterSpacing: "0.18em" }
          }
          whileTap={isOpening ? undefined : { opacity: 0.7 }}
        >
          {isOpening ? "OPENING YOUR LETTER" : "OPEN THE LETTER"}
          <span aria-hidden="true">↗</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
