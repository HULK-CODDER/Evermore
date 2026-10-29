"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Flower2,
  Heart,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
const WISHES = [
  {
    title: "A little more happiness",
    category: "HAPPINESS",
    message:
      "May ordinary days surprise you with extraordinary happiness, and may you always find little reasons to smile.",
  },
  {
    title: "The courage to grow",
    category: "COURAGE",
    message:
      "May you trust yourself enough to try new things, take brave steps, and remember that growing takes time.",
  },
  {
    title: "People who feel like sunshine",
    category: "FRIENDSHIP",
    message:
      "May you find people who celebrate your wins, listen on difficult days, laugh at the smallest things, and make life feel lighter.",
  },
  {
    title: "Beautiful little adventures",
    category: "ADVENTURE",
    message:
      "May there be new places to explore, unexpected plans worth remembering, and stories you will still be telling years from now.",
  },
  {
    title: "Room to breathe",
    category: "PEACE",
    message:
      "May you have gentle mornings, restful nights, quieter worries, and the freedom to slow down whenever you need to.",
  },
  {
    title: "Proud of how far you've come",
    category: "SUCCESS",
    message:
      "May your effort lead you somewhere meaningful. And along the way, may you remember to be proud of every small step forward.",
  },
  {
    title: "A beautiful new chapter",
    category: "NEW BEGINNINGS",
    message:
      "May this next year open doors you never expected, bring fresh inspiration, and give you the confidence to follow what matters to you.",
  },
  {
    title: "The unexpected good things",
    category: "LITTLE WONDERS",
    message:
      "May life surprise you kindly — with good news, lovely coincidences, new opportunities, and moments that turn into favourite memories.",
  },
];
const KEEPSAKES = [
  {
    id: "firefly",
    title: "The Firefly Note",
    category: "A HIDDEN LITTLE WONDER",
    message:
      "Some of the loveliest things arrive quietly. May you notice the little lights that make an ordinary day feel magical.",
    hint: "A note from a firefly",
    unlock: ({ flowerCount }) => flowerCount >= 4,
  },
  {
    id: "constellation",
    title: "A Little Constellation",
    category: "A MOMENT TO KEEP",
    message:
      "Every lovely memory is a little light of its own. Put enough of them together, and even an ordinary night can become something beautiful.",
    hint: "Connect the little lights",
    unlock: ({ collected }) => collected.length >= 3,
  },
  {
    id: "moonflower",
    title: "The Moonflower Secret",
    category: "THE GARDEN'S LAST SECRET",
    message:
      "May you always find something wonderful when you least expect it. And may you never forget that the world still has beautiful surprises waiting for you.",
    hint: "A secret beneath the moonflower",
    unlock: ({ flowerCount, collected }) =>
      flowerCount >= 8 && collected.length >= 5,
  },
];
const COLORS = [
  ["#F4A7BD", "#FFE1E9", "#F5D28C"],
  ["#C5A5EA", "#F0E2FF", "#F8DCA1"],
  ["#E7B57B", "#FFE8C5", "#F6D78B"],
  ["#E0A4B9", "#F9DCE8", "#EBD08D"],
  ["#B7CAA7", "#E3EFD8", "#F3D38C"],
  ["#F4C0A6", "#FFE7D7", "#F7D68D"],
  ["#A9C8D0", "#DDF5F4", "#F5D58F"],
  ["#E0B6DC", "#F7E3F4", "#F6D68E"],
];
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const easeOut = (n) => 1 - Math.pow(1 - clamp(n, 0, 1), 3);
function createFlower(x, ground, index, scale = 1, delay = 0) {
  return {
    x,
    ground,
    index: index % WISHES.length,
    scale,
    born: performance.now() + delay,
    duration: rand(1300, 2200),
    phase: rand(0, Math.PI * 2),
    sway: rand(0.006, 0.022),
    stem: rand(85, 170) * scale,
    size: rand(19, 31) * scale,
    petals: Math.floor(rand(8, 12)),
  };
}
function CanvasGarden({
  reducedMotion,
  onDiscoverWish,
  onCountChange,
  onCanvasReady,
}) {
  const canvasRef = useRef(null);
  const sceneRef = useRef({
    width: 0,
    height: 0,
    flowers: [],
    seeds: [],
    bursts: [],
    trail: [],
    nextWish: 0,
  });
  const onDiscoverRef = useRef(onDiscoverWish);
  const onCountRef = useRef(onCountChange);
  const onReadyRef = useRef(onCanvasReady);
  useEffect(() => {
    onDiscoverRef.current = onDiscoverWish;
    onCountRef.current = onCountChange;
    onReadyRef.current = onCanvasReady;
  }, [onDiscoverWish, onCountChange, onCanvasReady]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = sceneRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let previous = 0;
    let seedClock = 0;
    let lastWidth = 0;
    let lastHeight = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (width === lastWidth && height === lastHeight) return;
      if (lastWidth && lastHeight) {
        const sx = width / lastWidth;
        const sy = height / lastHeight;
        scene.flowers.forEach((flower) => {
          flower.x *= sx;
          flower.ground *= sy;
        });
        scene.seeds.forEach((seed) => {
          seed.x *= sx;
          seed.y *= sy;
        });
        scene.bursts.forEach((burst) => {
          burst.x *= sx;
          burst.y *= sy;
        });
      }
      lastWidth = width;
      lastHeight = height;
      scene.width = width;
      scene.height = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const addSeed = (x, y, boost = 1) => {
      scene.seeds.push({
        x,
        y,
        born: performance.now(),
        life: rand(2200, 5200),
        radius: rand(0.8, 2.2) * boost,
        speed: rand(0.008, 0.032),
        drift: rand(5, 26),
        phase: rand(0, Math.PI * 2),
        opacity: rand(0.25, 0.8),
      });
      if (scene.seeds.length > 180) scene.seeds.shift();
    };
    const burst = (x, y, size = 75) => {
      scene.bursts.push({
        x,
        y,
        born: performance.now(),
        radius: size,
      });
      for (let i = 0; i < (reducedMotion ? 5 : 20); i++) {
        addSeed(x + rand(-14, 14), y + rand(-14, 14), 1.15);
      }
    };
    const plant = (x, ground, scale = 1) => {
      const index = scene.nextWish % WISHES.length;
      scene.nextWish += 1;
      scene.flowers.push(
        createFlower(x, ground, index, scale)
      );
      const flower = scene.flowers[scene.flowers.length - 1];
      burst(x, ground - flower.stem, 55 + flower.size * 1.3);
      onCountRef.current?.(scene.flowers.length);
      onDiscoverRef.current?.(index);
    };
    const onPointerMove = (event) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      scene.trail.push({
        x,
        y,
        born: performance.now(),
        radius: rand(1, 2.5),
      });
      if (scene.trail.length > 70) scene.trail.shift();
    };
    const onPointerDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      plant(
        clamp(x, 15, scene.width - 15),
        clamp(y, scene.height * 0.48, scene.height * 0.97),
        rand(0.75, 1.12)
      );
    };
    const growGarden = (event) => {
      const count = event.detail?.count ?? 16;
      const width = scene.width;
      const height = scene.height;
      for (let i = 0; i < count; i++) {
        const x = rand(width * 0.04, width * 0.96);
        const ground = rand(height * 0.72, height * 0.97);
        const scale = rand(0.55, width < 600 ? 0.95 : 1.15);
        const index = scene.nextWish % WISHES.length;
        scene.nextWish += 1;
        scene.flowers.push(
          createFlower(
            x,
            ground,
            index,
            scale,
            reducedMotion ? 0 : i * 105
          )
        );
      }
      // Trim old flowers so long sessions stay lightweight.
      if (scene.flowers.length > 90) {
        scene.flowers = scene.flowers.slice(-90);
      }
      burst(width * 0.5, height * 0.6, Math.min(width, height) * 0.28);
      onCountRef.current?.(scene.flowers.length);
    };
    const resetGarden = () => {
      scene.flowers = [];
      scene.bursts = [];
      scene.trail = [];
      scene.nextWish = 0;
      onCountRef.current?.(0);
      // Restart with a small constellation of seeds.
      scene.seeds = [];
      for (let i = 0; i < (reducedMotion ? 15 : 42); i++) {
        addSeed(rand(0, scene.width), rand(0, scene.height));
      }
    };
        canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("bloom:grow", growGarden);
    window.addEventListener("bloom:reset", resetGarden);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    for (let i = 0; i < (reducedMotion ? 20 : 65); i++) {
      addSeed(rand(0, scene.width), rand(0, scene.height));
    }
    onReadyRef.current?.();
    const drawSeed = (seed, time) => {
      const age = time - seed.born;
      const life = clamp(1 - age / seed.life, 0, 1);
      if (life <= 0) return;
      const drift = reducedMotion
        ? 0
        : Math.sin(time * 0.0007 + seed.phase) * seed.drift;
      const y = seed.y - (reducedMotion ? 0 : age * seed.speed);
      ctx.save();
      ctx.globalAlpha = life * seed.opacity;
      ctx.translate(seed.x + drift, y);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, seed.radius * 7);
      glow.addColorStop(0, "#FFE7B6");
      glow.addColorStop(1, "#FFE7B600");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, seed.radius * 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#F7D9A2";
      ctx.beginPath();
      ctx.ellipse(0, 0, seed.radius * 1.5, seed.radius * 0.7, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const drawFlower = (flower, time) => {
      const age = time - flower.born;
      if (age < 0) return;
      const growth = easeOut(age / flower.duration);
      const sway = reducedMotion
        ? 0
        : Math.sin(time * 0.00065 + flower.phase) * flower.sway;
      const palette = COLORS[flower.index % COLORS.length];
      const [petalColor, lightColor, centerColor] = palette;
      const stemHeight = flower.stem * growth;
      const headX = flower.x + sway * 60;
      const headY = flower.ground - stemHeight;
      const size = flower.size * growth;
      ctx.save();
      ctx.lineCap = "round";
      // The stem grows from the ground upward.
      ctx.strokeStyle = "#809B7D";
      ctx.globalAlpha = 0.92;
      ctx.lineWidth = Math.max(1.2, flower.scale * 2.2);
      ctx.beginPath();
      ctx.moveTo(flower.x, flower.ground);
      ctx.bezierCurveTo(
        flower.x + sway * 40,
        flower.ground - stemHeight * 0.35,
        headX - sway * 20,
        flower.ground - stemHeight * 0.7,
        headX,
        headY
      );
      ctx.stroke();
      // Leaves unfold at different moments.
      [0.28, 0.48, 0.68].forEach((fraction, i) => {
        const leafProgress = easeOut((age - i * 130) / 750);
        if (leafProgress <= 0) return;
        const side = i % 2 === 0 ? 1 : -1;
        const leafX = flower.x + sway * 20 * fraction;
        const leafY = flower.ground - stemHeight * fraction;
        const length = flower.size * 1.55 * leafProgress;
        ctx.save();
        ctx.translate(leafX, leafY);
        ctx.rotate(side * -0.65 + sway);
        ctx.scale(side, 1);
        ctx.fillStyle = "#8DA986";
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(length * 0.4, -length * 0.72, length, -length * 0.28);
        ctx.quadraticCurveTo(length * 0.5, length * 0.13, 0, 0);
        ctx.fill();
        ctx.strokeStyle = "#C7D8B5";
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length * 0.82, -length * 0.3);
        ctx.stroke();
        ctx.restore();
      });
      // Flower halo.
      ctx.save();
      ctx.translate(headX, headY);
      ctx.rotate(sway * 1.5);
      const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3.5);
      halo.addColorStop(0, `${lightColor}45`);
      halo.addColorStop(1, `${lightColor}00`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, size * 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Petals unfold sequentially.
      for (let i = 0; i < flower.petals; i++) {
        const angle = (Math.PI * 2 * i) / flower.petals;
        const delay = reducedMotion ? 0 : (i % 4) * 70;
        const opening = easeOut((age - delay) / (flower.duration * 0.78));
        if (opening <= 0) continue;
        ctx.save();
        ctx.rotate(angle + (reducedMotion ? 0 : time * 0.000025));
        ctx.translate(size * 0.12, 0);
        ctx.scale(opening, opening);
        const length = size * 0.9;
        const width = size * 0.37;
        ctx.fillStyle = petalColor;
        ctx.beginPath();
        ctx.ellipse(length * 0.52, 0, length * 0.64, width, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `${lightColor}C0`;
        ctx.lineWidth = Math.max(0.65, flower.scale * 0.65);
        ctx.beginPath();
        ctx.moveTo(length * 0.15, 0);
        ctx.quadraticCurveTo(length * 0.65, -width * 0.12, length * 1.08, 0);
        ctx.stroke();
        ctx.restore();
      }
      // Centre of the flower.
      ctx.fillStyle = centerColor;
      ctx.shadowColor = centerColor;
      ctx.shadowBlur = reducedMotion ? 0 : 14;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1.8, size * 0.21), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let i = 0; i < 9; i++) {
        const angle = (Math.PI * 2 * i) / 9;
        ctx.fillStyle = "#FFF0C4";
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * size * 0.12,
          Math.sin(angle) * size * 0.12,
          Math.max(0.65, size * 0.025),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();
      ctx.restore();
    };
    const drawBurst = (item, time) => {
      const progress = clamp((time - item.born) / 950, 0, 1);
      const radius = easeOut(progress) * item.radius;
      ctx.save();
      ctx.globalAlpha = (1 - progress) * 0.75;
      ctx.strokeStyle = "#EBD09A";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(item.x, item.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      if (!reducedMotion) {
        for (let i = 0; i < 18; i++) {
          const angle = (Math.PI * 2 * i) / 18;
          const distance = radius * (0.75 + (i % 3) * 0.12);
          ctx.fillStyle = "#FCE6BC";
          ctx.beginPath();
          ctx.arc(
            item.x + Math.cos(angle) * distance,
            item.y + Math.sin(angle) * distance,
            1.5 * (1 - progress),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      ctx.restore();
    };
    const draw = (time) => {
      raf = requestAnimationFrame(draw);
      const delta = previous ? Math.min(time - previous, 32) : 16;
      previous = time;
      const { width, height } = scene;
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      // Deep twilight palette.
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#17121F");
      bg.addColorStop(0.48, "#251A2C");
      bg.addColorStop(1, "#111921");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      // Warm light behind the flowers.
      const glow = ctx.createRadialGradient(
        width * 0.54,
        height * 0.66,
        0,
        width * 0.54,
        height * 0.66,
        Math.max(width, height) * 0.75
      );
      glow.addColorStop(0, "#74465B45");
      glow.addColorStop(0.6, "#3D2B4240");
      glow.addColorStop(1, "#17121F00");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      // Static star points; no expensive particle simulation needed.
      for (let i = 0; i < (reducedMotion ? 22 : 62); i++) {
        const x = (i * 139.7 + 17) % width;
        const y = (i * 83.1 + 31) % height;
        const alpha = reducedMotion
          ? 0.4
          : 0.18 + (Math.sin(time * 0.001 + i) + 1) * 0.22;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#FFE9CB";
        ctx.beginPath();
        ctx.arc(x, y, i % 8 === 0 ? 1.35 : 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      seedClock += delta;
      if (seedClock > 170 && scene.seeds.length < (reducedMotion ? 35 : 130)) {
        seedClock = 0;
        addSeed(rand(0, width), height + 10);
      }
      scene.seeds = scene.seeds.filter(
        (seed) => time - seed.born < seed.life
      );
      scene.seeds.forEach((seed) => drawSeed(seed, time));
      scene.flowers.forEach((flower) => drawFlower(flower, time));
      scene.bursts = scene.bursts.filter(
        (item) => time - item.born < 1000
      );
      scene.bursts.forEach((item) => drawBurst(item, time));
      scene.trail = scene.trail.filter(
        (point) => time - point.born < 650
      );
      scene.trail.forEach((point) => {
        const life = 1 - (time - point.born) / 650;
        ctx.globalAlpha = life * 0.75;
        ctx.fillStyle = "#F9DDB1";
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * life, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("bloom:grow", growGarden);
      window.removeEventListener("bloom:reset", resetGarden);
    };
  }, [reducedMotion]);
  return (
    <canvas
      ref={canvasRef}
      className="bloom-canvas"
      aria-label="An interactive flower garden. Tap the garden to plant a flower and discover a birthday wish."
    />
  );
}
export default function BloomPage() {
  const reducedMotion = useReducedMotion();
  const [flowerCount, setFlowerCount] = useState(0);
  const [activeWish, setActiveWish] = useState(null);
  const [collected, setCollected] = useState([]);
  const [showCollection, setShowCollection] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeKeepsake, setActiveKeepsake] = useState(null);
    const [collectedKeepsakes, setCollectedKeepsakes] = useState([]);
  const [constellationProgress, setConstellationProgress] = useState(0);
  const discoverWish = useCallback((index) => {
    setCollected((previous) =>
      previous.includes(index) ? previous : [...previous, index]
    );
    setActiveWish(index);
  }, []);
  const countChange = useCallback((count) => {
    setFlowerCount(count);
  }, []);
  const gardenReady = useCallback(() => {
    setReady(true);
  }, []);
  const bloomAll = () => {
    setActiveWish(null);
    setActiveKeepsake(null);
    setShowCollection(false);
    setShowFinale(false);
    window.dispatchEvent(
      new CustomEvent("bloom:grow", {
        detail: { count: reducedMotion ? 7 : 18 },
      })
    );
  };
  const restart = () => {
    window.dispatchEvent(new CustomEvent("bloom:reset"));
    setFlowerCount(0);
    setActiveWish(null);
    setCollected([]);
    setActiveKeepsake(null);
    setCollectedKeepsakes([]);
    setConstellationProgress(0);
    setShowCollection(false);
    setShowFinale(false);
  };
  const openWish = (index) => {
    setCollected((previous) =>
      previous.includes(index) ? previous : [...previous, index]
    );
    setActiveWish(index);
    setShowCollection(false);
  };
  const openKeepsake = (id) => {
    const keepsake = KEEPSAKES.find((item) => item.id === id);
    if (!keepsake) return;
    setCollectedKeepsakes((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
    setActiveKeepsake(keepsake);
    setActiveWish(null);
    setShowCollection(false);
    setShowFinale(false);
  };
  const connectConstellation = () => {
    const nextProgress = constellationProgress + 1;
    setConstellationProgress(nextProgress);
    if (nextProgress >= 3) openKeepsake("constellation");
  };
  return (
    <main className="bloom-page">
      <style>{`
        .bloom-page {
          --bloom-cream: #f9f2e8;
          --bloom-muted: #c2b4c4;
          --bloom-gold: #ebcb91;
          min-height: 100svh;
          min-height: 100dvh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: #17121f;
          color: var(--bloom-cream);
          font-family: var(--font-sans, Arial, sans-serif);
        }
        .bloom-page * { box-sizing: border-box; }
        .bloom-page button, .bloom-page a {
          -webkit-tap-highlight-color: transparent;
        }
        .bloom-page button { font: inherit; }
        .bloom-page button:focus-visible,
        .bloom-page a:focus-visible {
          outline: 2px solid var(--bloom-gold);
          outline-offset: 4px;
        }
        .bloom-page .bloom-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: block;
          cursor: crosshair;
          touch-action: pan-y;
        }
        .bloom-page .bloom-topbar {
          position: absolute;
          z-index: 3;
          inset: 0 0 auto;
          min-height: 72px;
          padding: 0 clamp(19px, 5vw, 64px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ffffff10;
          background: linear-gradient(#17121f70, #17121f00);
        }
        .bloom-page .bloom-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #f9f2e8;
          text-decoration: none;
          font: 15px Georgia, serif;
          letter-spacing: .23em;
        }
        .bloom-page .bloom-brand-icon {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          color: var(--bloom-gold);
          border: 1px solid #ebcb9170;
          border-radius: 50%;
        }
        .bloom-page .bloom-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #cbbdce;
          font-size: 10px;
          letter-spacing: .1em;
          text-decoration: none;
          text-transform: uppercase;
        }
        .bloom-page .bloom-back:hover { color: #fff0d3; }
        .bloom-page .bloom-scene {
          position: relative;
          min-height: 100svh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 clamp(22px, 7vw, 100px);
        }
        .bloom-page .bloom-intro {
          z-index: 1;
          position: relative;
          width: min(100%, 550px);
          margin-top: clamp(115px, 16vh, 170px);
          pointer-events: none;
        }
        .bloom-page .bloom-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--bloom-gold);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .23em;
          text-transform: uppercase;
        }
        .bloom-page .bloom-kicker::before {
          content: "";
          width: 25px;
          height: 1px;
          background: var(--bloom-gold);
        }
        .bloom-page .bloom-heading {
          margin: 19px 0 15px;
          max-width: 560px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(52px, 7vw, 88px);
          line-height: .96;
          font-weight: 400;
          letter-spacing: -.065em;
          text-wrap: balance;
          color: #fbf3e9;
          text-shadow: 0 4px 45px #17121f66;
        }
        .bloom-page .bloom-heading em {
          color: var(--bloom-gold);
          font-weight: 400;
        }
        .bloom-page .bloom-description {
          max-width: 350px;
          margin: 0;
          color: #d0c2d0;
          font-size: 12px;
          line-height: 1.9;
          letter-spacing: .02em;
          text-shadow: 0 2px 18px #17121f;
        }
        .bloom-page .bloom-bottom-panel {
          z-index: 2;
          position: relative;
          width: min(100%, 760px);
          margin: 0 auto;
          padding: 20px 0 max(28px, env(safe-area-inset-bottom));
        }
                  .bloom-page .bloom-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 auto 17px;
          color: #d3c4d0;
          font-size: 10px;
          letter-spacing: .04em;
          text-align: center;
          text-shadow: 0 2px 15px #17121f;
        }
        .bloom-page .bloom-hint svg { color: var(--bloom-gold); }
        .bloom-page .bloom-action-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 14px;
          border: 1px solid #f9ead91b;
          border-radius: 5px;
          background: #201a2bc9;
          box-shadow: 0 18px 70px #08070c35;
          backdrop-filter: blur(20px);
        }
        .bloom-page .bloom-count {
          min-width: 100px;
          padding-left: 7px;
        }
        .bloom-page .bloom-count-number {
          display: block;
          color: var(--bloom-gold);
          font: 28px Georgia, serif;
          line-height: 1.05;
        }
        .bloom-page .bloom-count-label {
          display: block;
          margin-top: 5px;
          color: #b9aabb;
          font-size: 8px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .bloom-page .bloom-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bloom-page .bloom-primary,
        .bloom-page .bloom-secondary,
        .bloom-page .bloom-icon-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 43px;
          padding: 0 13px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
          transition: transform .25s ease, background .25s ease,
            border-color .25s ease, color .25s ease;
        }
        .bloom-page .bloom-primary {
          border: 1px solid var(--bloom-gold);
          background: var(--bloom-gold);
          color: #241b28;
          font-weight: 600;
        }
        .bloom-page .bloom-secondary {
          border: 1px solid #f6e6dc28;
          background: #ffffff05;
          color: #f2e5ec;
        }
        .bloom-page .bloom-icon-button {
          width: 43px;
          padding: 0;
          border: 1px solid #f6e6dc28;
          background: transparent;
          color: #e6d8e4;
        }
        .bloom-page .bloom-primary:hover,
        .bloom-page .bloom-secondary:hover,
        .bloom-page .bloom-icon-button:hover {
          transform: translateY(-2px);
        }
        .bloom-page .bloom-secondary:hover,
        .bloom-page .bloom-icon-button:hover {
          border-color: #ebcb9170;
          background: #ffffff0b;
        }
        .bloom-page .bloom-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 15px;
        }
        .bloom-page .bloom-progress-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #85758e;
        }
        .bloom-page .bloom-progress-dot.is-active {
          width: 16px;
          border-radius: 4px;
          background: var(--bloom-gold);
        }
        .bloom-page .bloom-progress-label {
          margin-left: 5px;
          color: #b5a4b7;
          font-size: 9px;
          letter-spacing: .08em;
        }
        .bloom-page .bloom-footer {
          position: absolute;
          z-index: 2;
          right: 22px;
          top: 50%;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b8a9bb;
          font-size: 8px;
          letter-spacing: .16em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          pointer-events: none;
        }
        .bloom-page .bloom-footer::before {
          content: "";
          height: 28px;
          width: 1px;
          background: linear-gradient(transparent, #ebcb91aa);
        }
        .bloom-page .bloom-overlay {
          position: fixed;
          z-index: 20;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 18px;
          background: #0e0b14d9;
          backdrop-filter: blur(14px);
        }
        .bloom-page .bloom-modal {
          position: relative;
          width: min(100%, 470px);
          max-height: min(86dvh, 780px);
          overflow-y: auto;
          padding: clamp(29px, 6vw, 53px);
          text-align: center;
          border: 1px solid #ebcb9140;
          background:
            radial-gradient(ellipse at 50% 0%, #79506442, transparent 68%),
            #211a2a;
          box-shadow: 0 30px 100px #00000055;
        }
        .bloom-page .bloom-modal::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid #ebcb911a;
          pointer-events: none;
        }
        .bloom-page .bloom-close {
          position: absolute;
          z-index: 1;
          top: 15px;
          right: 15px;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid #ffffff20;
          border-radius: 50%;
          color: #e9dce6;
          background: transparent;
          cursor: pointer;
        }
        .bloom-page .bloom-modal-symbol {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          margin: 0 auto 21px;
          border: 1px solid #ebcb9166;
          border-radius: 50%;
          color: var(--bloom-gold);
        }
        .bloom-page .bloom-modal-kicker {
          color: var(--bloom-gold);
          font-size: 9px;
          letter-spacing: .23em;
          text-transform: uppercase;
        }
        .bloom-page .bloom-modal-title {
          margin: 18px 0 16px;
          color: #fbf3e9;
          font: 400 clamp(34px, 8vw, 49px)/1.07 Georgia, serif;
          letter-spacing: -.04em;
        }
        .bloom-page .bloom-modal-title em {
          color: var(--bloom-gold);
          font-weight: 400;
        }
        .bloom-page .bloom-modal-copy {
          max-width: 330px;
          margin: 0 auto;
          color: #d0c0d0;
          font-size: 12px;
          line-height: 2;
        }
        .bloom-page .bloom-modal-foot {
          margin-top: 25px;
          color: #e4cba7;
          font: italic 17px Georgia, serif;
        }
        .bloom-page .bloom-modal-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 27px;
        }
        .bloom-page .bloom-collection {
          width: min(100%, 540px);
          padding: 30px 24px 25px;
          text-align: left;
        }
        .bloom-page .bloom-collection-header {
          text-align: center;
          padding: 0 18px 23px;
        }
        .bloom-page .bloom-collection-header h2 {
          margin: 15px 0 9px;
          font: 400 36px/1.08 Georgia, serif;
          letter-spacing: -.04em;
        }
        .bloom-page .bloom-collection-header p {
          margin: 0;
          color: #c5b6c7;
          font-size: 11px;
          line-height: 1.8;
        }
        .bloom-page .bloom-wish-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .bloom-page .bloom-wish-tile {
          min-height: 115px;
          padding: 14px;
          text-align: left;
          border: 1px solid #ffffff16;
          background: #ffffff05;
          color: #f9f2e8;
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease;
        }
        .bloom-page .bloom-wish-tile:hover,
        .bloom-page .bloom-wish-tile.is-collected {
          border-color: #ebcb9175;
          background: #ebcb910d;
        }
        .bloom-page .bloom-tile-number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          color: var(--bloom-gold);
          font: 17px Georgia, serif;
        }
        .bloom-page .bloom-tile-category {
          display: block;
          margin-bottom: 7px;
          color: #b7a6bd;
          font-size: 8px;
          letter-spacing: .14em;
        }
        .bloom-page .bloom-tile-title {
          display: block;
          color: #f4e9ef;
          font: 15px/1.3 Georgia, serif;
        }
        .bloom-page .bloom-collection-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          color: #c2b1c5;
          font-size: 10px;
        }
        .bloom-page .bloom-final-modal {
          text-align: center;
          padding-top: 48px;
          padding-bottom: 42px;
        }
        .bloom-page .bloom-final-flower {
          color: var(--bloom-gold);
          margin: 0 auto 20px;
        }
        .bloom-page .bloom-final-message {
          max-width: 350px;
          margin: 0 auto;
          color: #d1c0d0;
          font-size: 12px;
          line-height: 2;
        }
        .bloom-page .bloom-keepsakes {
          margin-top: 14px;
          padding: 13px 15px;
          border: 1px solid #ebcb9125;
          border-radius: 5px;
          background: #201a2b9c;
          backdrop-filter: blur(14px);
        }
                  .bloom-page .bloom-keepsakes-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--bloom-gold);
          font-size: 9px;
          letter-spacing: .13em;
          text-transform: uppercase;
        }
        .bloom-page .bloom-keepsakes-count {
          margin-left: auto;
          color: #b9aabb;
          letter-spacing: .06em;
        }
        .bloom-page .bloom-keepsakes-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .bloom-page .bloom-keepsake-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 36px;
          padding: 8px 10px;
          border: 1px solid #ebcb9145;
          border-radius: 3px;
          background: #ffffff08;
          color: #f2e5ec;
          font-size: 10px;
          text-align: left;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }
        .bloom-page .bloom-keepsake-button:hover {
          border-color: var(--bloom-gold);
          background: #ebcb9112;
        }
        .bloom-page .bloom-keepsake-button svg {
          flex-shrink: 0;
          color: var(--bloom-gold);
        }
        .bloom-page .bloom-keepsakes-empty {
          margin: 0;
          color: #b9aabb;
          font-size: 10px;
          line-height: 1.7;
        }
        @media (min-width: 900px) {
          .bloom-page .bloom-intro { margin-top: clamp(130px, 19vh, 205px); }
          .bloom-page .bloom-bottom-panel { padding-bottom: 32px; }
        }
        @media (max-width: 600px) {
          .bloom-page .bloom-keepsakes {
            margin-top: 12px;
            padding: 12px;
          }
          .bloom-page .bloom-keepsakes-list { gap: 7px; }
          .bloom-page .bloom-keepsake-button {
            min-height: 40px;
            font-size: 10px;
          }
          .bloom-page .bloom-topbar {
            min-height: 63px;
            padding: 0 19px;
          }
          .bloom-page .bloom-brand {
            gap: 8px;
            font-size: 13px;
          }
          .bloom-page .bloom-brand-icon {
            width: 28px;
            height: 28px;
          }
          .bloom-page .bloom-back {
            gap: 5px;
            font-size: 8px;
            letter-spacing: .045em;
          }
          .bloom-page .bloom-scene {
            padding: 0 18px;
          }
          .bloom-page .bloom-intro {
            width: 100%;
            margin-top: max(100px, 13svh);
          }
          .bloom-page .bloom-kicker {
            font-size: 8px;
            letter-spacing: .18em;
          }
          .bloom-page .bloom-heading {
            max-width: 370px;
            margin: 17px 0 12px;
            font-size: clamp(49px, 13.2vw, 71px);
          }
          .bloom-page .bloom-description {
            max-width: 290px;
            font-size: 11px;
            line-height: 1.8;
          }
          .bloom-page .bloom-bottom-panel {
            width: 100%;
            padding: 15px 0 max(23px, env(safe-area-inset-bottom));
          }
          .bloom-page .bloom-hint {
            max-width: 300px;
            margin-bottom: 12px;
            font-size: 9px;
            line-height: 1.6;
          }
          .bloom-page .bloom-action-card {
            display: block;
            padding: 13px;
            border-radius: 5px;
          }
          .bloom-page .bloom-count {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 0 2px 12px;
          }
          .bloom-page .bloom-count-number {
            font-size: 24px;
          }
          .bloom-page .bloom-count-label {
            margin: 0;
            font-size: 8px;
          }
          .bloom-page .bloom-actions {
            display: grid;
            grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) 43px;
            gap: 7px;
          }
          .bloom-page .bloom-primary,
          .bloom-page .bloom-secondary,
          .bloom-page .bloom-icon-button {
            min-height: 45px;
            padding: 0 8px;
            gap: 6px;
            font-size: 9px;
          }
          .bloom-page .bloom-icon-button { width: 100%; }
          .bloom-page .bloom-progress { margin-top: 13px; }
          .bloom-page .bloom-footer { display: none; }
          .bloom-page .bloom-modal {
            padding: 39px 25px 30px;
          }
          .bloom-page .bloom-collection {
            padding: 32px 16px 20px;
          }
          .bloom-page .bloom-collection-header h2 { font-size: 33px; }
          .bloom-page .bloom-wish-list { gap: 7px; }
          .bloom-page .bloom-wish-tile {
            min-height: 110px;
            padding: 11px;
          }
          .bloom-page .bloom-tile-title { font-size: 14px; }
          .bloom-page .bloom-collection-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
        @media (max-width: 370px) {
          .bloom-page .bloom-heading { font-size: 47px; }
          .bloom-page .bloom-actions { grid-template-columns: 1fr 1fr 40px; }
          .bloom-page .bloom-primary,
          .bloom-page .bloom-secondary { font-size: 8px; }
          .bloom-page .bloom-icon-button { width: 40px; }
        }
        @media (max-height: 720px) and (min-width: 601px) {
          .bloom-page .bloom-intro { margin-top: 105px; }
          .bloom-page .bloom-heading { font-size: clamp(48px, 6vw, 68px); }
          .bloom-page .bloom-bottom-panel { padding-bottom: 17px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bloom-page *,
          .bloom-page *::before,
          .bloom-page *::after {
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }
        }
      `}</style>
      <CanvasGarden
        reducedMotion={Boolean(reducedMotion)}
        onDiscoverWish={discoverWish}
        onCountChange={countChange}
        onCanvasReady={gardenReady}
      />
      <header className="bloom-topbar">
        <Link className="bloom-brand" href="/" aria-label="Evermore home">
          <span className="bloom-brand-icon">
            <Sparkles size={15} strokeWidth={1.3} />
          </span>
          EVERMORE
        </Link>
        <Link className="bloom-back" href="/experiences">
          <ArrowLeft size={13} />
          Experiences
        </Link>
      </header>
      <section className="bloom-scene">
        <motion.div
          className="bloom-intro"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: ready ? 1 : 0, y: ready || reducedMotion ? 0 : 22 }}
          transition={{ duration: reducedMotion ? 0 : 1.1, delay: 0.15 }}
        >
          <span className="bloom-kicker">A little garden of wishes</span>
          <h1 className="bloom-heading">
            Watch a wish
            <br />
            <em>blossom.</em>
          </h1>
          <p className="bloom-description">
            Some of the loveliest things begin with a little spark.
            Plant a flower, discover a wish, and let this tiny garden
            grow into something beautiful.
          </p>
        </motion.div>
        <div className="bloom-footer">
          <span>Touch · Grow · Discover</span>
        </div>
        <div className="bloom-bottom-panel">
          <p className="bloom-hint">
            <Sparkles size={13} />
            Tap anywhere in the garden to grow a flower and uncover a wish.
          </p>
          <div className="bloom-action-card">
            <div className="bloom-count">
              <span className="bloom-count-number">
                {String(flowerCount).padStart(2, "0")}
              </span>
              <span className="bloom-count-label">
                flowers grown
                <br />
                {collected.length} of {WISHES.length} wishes discovered
              </span>
            </div>
            <div className="bloom-actions">
              <button
                className="bloom-primary"
                type="button"
                onClick={bloomAll}
              >
                <Sparkles size={14} />
                Bloom all
              </button>
              <button
                className="bloom-secondary"
                type="button"
                onClick={() => setShowCollection(true)}
              >
                <Heart size={13} />
                My wishes
              </button>
              <button
                className="bloom-icon-button"
                type="button"
                onClick={restart}
                aria-label="Start the garden again"
                title="Start again"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
          <div className="bloom-progress" aria-label={`${collected.length} of 8 wishes discovered`}>
            {WISHES.map((wish, index) => (
              <span
                key={wish.category}
                className={`bloom-progress-dot ${
                  collected.includes(index) ? "is-active" : ""
                }`}
              />
            ))}
            <span className="bloom-progress-label">
              {collected.length === WISHES.length
                ? "Garden of wishes complete"
                : "A little more to discover"}
            </span>
          </div>
          <div className="bloom-keepsakes">
            <div className="bloom-keepsakes-heading">
              <Sparkles size={13} />
              <span>Little secrets</span>
              <span className="bloom-keepsakes-count">
                {collectedKeepsakes.length} / {KEEPSAKES.length} found
              </span>
            </div>
            <div className="bloom-keepsakes-list">
              {KEEPSAKES.map((keepsake) => {
                const isCollected = collectedKeepsakes.includes(keepsake.id);
                const isUnlocked = keepsake.unlock({ flowerCount, collected });
                if (!isUnlocked && !isCollected) return null;
                if (keepsake.id === "constellation" && !isCollected) {
                  return (
                    <button
                      key={keepsake.id}
                      type="button"
                      className="bloom-keepsake-button"
                      onClick={connectConstellation}
                    >
                      <Sparkles size={12} />
                      <span>Connect the lights · {constellationProgress}/3</span>
                      <ArrowRight size={12} />
                    </button>
                  );
                }
                return (
                  <button
                    key={keepsake.id}
                    type="button"
                    className="bloom-keepsake-button"
                    onClick={() => openKeepsake(keepsake.id)}
                  >
                    <Sparkles size={12} />
                    <span>{isCollected ? keepsake.title : keepsake.hint}</span>
                    <ArrowRight size={12} />
                  </button>
                );
              })}
              {collectedKeepsakes.length === 0 && (
                <p className="bloom-keepsakes-empty">
                  Grow flowers and discover wishes. You may find something extra.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {activeWish !== null && (
          <motion.div
            className="bloom-overlay"
            key="wish-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveWish(null);
            }}
          >
            <motion.section
              className="bloom-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bloom-wish-title"
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.4 }}
            >
              <button
                className="bloom-close"
                type="button"
                onClick={() => setActiveWish(null)}
                aria-label="Close wish"
              >
                <X size={16} />
              </button>
              <div className="bloom-modal-symbol">
                <Flower2 size={21} strokeWidth={1.3} />
              </div>
              <span className="bloom-modal-kicker">
                                {WISHES[activeWish].category}
              </span>
              <h2 className="bloom-modal-title" id="bloom-wish-title">
                {WISHES[activeWish].title}
              </h2>
              <p className="bloom-modal-copy">
                {WISHES[activeWish].message}
              </p>
              <div className="bloom-modal-foot">
                A little wish, just for you.
              </div>
              <div className="bloom-modal-actions">
                <button
                  type="button"
                  className="bloom-primary"
                  onClick={() => {
                    setActiveWish(null);
                    window.dispatchEvent(
                      new CustomEvent("bloom:grow", {
                        detail: { count: reducedMotion ? 3 : 6 },
                      })
                    );
                  }}
                >
                  Grow another
                  <Sparkles size={13} />
                </button>
                <button
                  type="button"
                  className="bloom-secondary"
                  onClick={() => {
                    setActiveWish(null);
                    setShowCollection(true);
                  }}
                >
                  My wishes
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCollection && (
          <motion.div
            className="bloom-overlay"
            key="collection-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowCollection(false);
              }
            }}
          >
            <motion.section
              className="bloom-modal bloom-collection"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bloom-collection-title"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <button
                className="bloom-close"
                type="button"
                onClick={() => setShowCollection(false)}
                aria-label="Close wish collection"
              >
                <X size={16} />
              </button>
              <div className="bloom-collection-header">
                <div className="bloom-modal-symbol">
                  <Heart size={19} strokeWidth={1.3} />
                </div>
                <span className="bloom-modal-kicker">Collected with care</span>
                <h2 id="bloom-collection-title">Your little wishes</h2>
                <p>
                  {collected.length} of {WISHES.length} wishes discovered.
                  Select any flower to revisit its message.
                </p>
              </div>
              <div className="bloom-wish-list">
                {WISHES.map((wish, index) => {
                  const isCollected = collected.includes(index);
                  return (
                    <button
                      type="button"
                      key={wish.category}
                      className={`bloom-wish-tile ${
                        isCollected ? "is-collected" : ""
                      }`}
                      onClick={() => {
                        if (isCollected) {
                          openWish(index);
                        } else {
                          setShowCollection(false);
                          window.dispatchEvent(
                            new CustomEvent("bloom:grow", {
                              detail: { count: reducedMotion ? 1 : 3 },
                            })
                          );
                          // Discovering a wish is tied to tapping the garden.*
                        }
                      }}
                    >
                      <span className="bloom-tile-number">
                        <span>0{index + 1}</span>
                        {isCollected ? (
                          <Heart size={13} fill="#ebcb91" />
                        ) : (
                          <Sparkles size={13} />
                        )}
                      </span>
                      <span className="bloom-tile-category">
                        {isCollected ? wish.category : "WAITING TO BLOOM"}
                      </span>
                      <span className="bloom-tile-title">
                        {isCollected ? wish.title : "A wish awaits"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="bloom-collection-footer">
                <span>
                  {collected.length === WISHES.length
                    ? "Every wish has found its flower."
                    : "Keep planting flowers to discover more."}
                </span>
                {collected.length === WISHES.length && (
                  <button
                    className="bloom-primary"
                    type="button"
                    onClick={() => {
                      setShowCollection(false);
                      setShowFinale(true);
                    }}
                  >
                    The final wish
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeKeepsake && (
          <motion.div
            className="bloom-overlay"
            key={`keepsake-${activeKeepsake.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveKeepsake(null);
            }}
          >
            <motion.section
              className="bloom-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bloom-keepsake-title"
              initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.35 }}
            >
              <button
                className="bloom-close"
                type="button"
                onClick={() => setActiveKeepsake(null)}
                aria-label="Close keepsake"
              >
                <X size={16} />
              </button>
              <div className="bloom-modal-symbol">
                <Sparkles size={21} strokeWidth={1.3} />
              </div>
              <span className="bloom-modal-kicker">{activeKeepsake.category}</span>
              <h2 className="bloom-modal-title" id="bloom-keepsake-title">
                {activeKeepsake.title}
              </h2>
              <p className="bloom-modal-copy">{activeKeepsake.message}</p>
              <div className="bloom-modal-foot">A little secret, found just for you.</div>
              <div className="bloom-modal-actions">
                <button
                  type="button"
                  className="bloom-primary"
                  onClick={() => setActiveKeepsake(null)}
                >
                  Back to the garden <Flower2 size={13} />
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFinale && (
          <motion.div
            className="bloom-overlay"
            key="finale-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              className="bloom-modal bloom-final-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bloom-final-title"
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <button
                className="bloom-close"
                type="button"
                onClick={() => setShowFinale(false)}
                aria-label="Close final wish"
              >
                <X size={16} />
              </button>
              <Flower2 className="bloom-final-flower" size={36} strokeWidth={1.1} />
              <span className="bloom-modal-kicker">For the year ahead</span>
              <h2 className="bloom-modal-title" id="bloom-final-title">
                Happy Birthday.
                <br />
                <em>May you always bloom.</em>
              </h2>
              <p className="bloom-final-message">
                May the year ahead bring you genuine happiness, wonderful
                people, new adventures, and moments that remind you how much
                possibility life still holds. May you grow at your own pace,
                find beauty in unexpected places, and have many reasons to
                celebrate the person you are becoming.
              </p>
              <div className="bloom-modal-foot">
                Wishing you a beautiful year ahead.
              </div>
              <div className="bloom-modal-actions">
                <button
                  className="bloom-primary"
                  type="button"
                  onClick={() => setShowFinale(false)}
                >
                  Back to the garden
                  <Sparkles size={13} />
                </button>
                <button
                  className="bloom-secondary"
                  type="button"
                  onClick={restart}
                >
                  <RotateCcw size={13} />
                  Start again
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}