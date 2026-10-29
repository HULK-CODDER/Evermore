"use client"


import React, { useState, useEffect, useRef } from "react";


export default function BirthdayCard3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("wish"); // 'wish' | 'quiz' | 'memories'
  const [quizScore, setQuizScore] = useState(null);

  const audioRef = useRef(null);
  const cardRef = useRef(null);

  // Sound effects generator using Web Audio API
  const playSoundEffect = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "pop") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "blow") {
        // Noise buffer for blowing effect
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 800;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } else if (type === "chime") {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
        });
      }
    } catch (e) {
      console.log("Audio not allowed yet or not supported", e);
    }
  };

  // Toggle Background Music Synthesizer Loop using Web Audio API
  useEffect(() => {
    let ctx, osc1, osc2, gainNode, isStopped = false;

    if (isPlayingMusic) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();

        // Soft melodic ambient chord loop
        const freqs = [261.63, 329.63, 392.00, 523.25]; // C major 7th feel
        let step = 0;

        const playNote = () => {
          if (isStopped) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freqs[step % freqs.length], ctx.currentTime);
          
          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 1.2);

          step++;
        };

        const interval = setInterval(playNote, 600);
        return () => {
          isStopped = true;
          clearInterval(interval);
          if (ctx) ctx.close();
        };
      } catch (err) {
        console.error(err);
      }
    }
  }, [isPlayingMusic]);

  // Handle Card Flip
  const handleCardToggle = () => {
    playSoundEffect("chime");
    setIsOpen(!isOpen);
  };

  // Blow Candle Action
  const handleBlowCandle = (e) => {
    e.stopPropagation();
    playSoundEffect("blow");
    setIsBlown(true);
    setTimeout(() => {
      playSoundEffect("pop");
    }, 300);
  };

  // 3D Parallax Mouse / Touch movement calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 20; // Max 20deg
    const rotateY = (x / rect.width) * 20;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#090a16] text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans">
      {/* Dynamic CSS Styling & 3D Keyframes */}
      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(-180deg);
        }
        
        /* Floating background elements */
        @keyframes floatBg {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes particleSparkle {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
          50% { transform: scale(1.15) rotate(2deg); opacity: 1; filter: drop-shadow(0 0 12px #f59e0b); }
        }

        .animate-float {
          animation: floatBg 5s ease-in-out infinite;
        }
        .animate-flame {
          animation: flameFlicker 0.6s ease-in-out infinite alternate;
        }
        .gold-glow {
          text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 25px rgba(244, 114, 182, 0.4);
        }
        .pink-foil {
          background: linear-gradient(135deg, #f472b6 0%, #fb7185 50%, #e879f9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gold-gradient-border {
          border-image: linear-gradient(to bottom right, #fef08a, #f472b6, #a855f7) 1;
        }
      `}</style>

      {/* Floating Animated Background Particle Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-purple-600/20 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Dynamic Floating Particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              animation: `particleSparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Top Navbar Header */}
      <header className="w-full max-w-4xl relative z-20 flex justify-between items-center py-2">
        <div className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl">✨</span>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold tracking-wider text-pink-300 uppercase">
              Lipsy's 3D B'day Experience
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400">November 10 Special Edition</p>
          </div>
        </div>

        {/* Music Sound Toggle */}
        <button
          onClick={() => {
            playSoundEffect("pop");
            setIsPlayingMusic(!isPlayingMusic);
          }}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-pink-500/30 text-pink-300 hover:text-white text-xs font-medium backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <span>{isPlayingMusic ? "🔊 Ambient Sound On" : "🔇 Enable Sound"}</span>
        </button>
      </header>

      {/* Main 3D Card Interactive Stage */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center relative z-10 my-4 sm:my-8">
        
        {/* Helper Hint */}
        <p className="text-xs sm:text-sm text-pink-300/80 mb-4 text-center animate-bounce flex items-center space-x-1.5">
          <span>👆</span>
          <span>{isOpen ? "Click card back to fold close" : "Click card cover to open in 3D!"}</span>
        </p>

        {/* 3D Perspective Stage Wrapper */}
        <div
          className="perspective-1000 w-full max-w-[340px] sm:max-w-[460px] h-[480px] sm:h-[580px] cursor-pointer select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardToggle}
        >
          {/* Card Container with Interactive Tilt and Flip Transforms */}
          <div
            ref={cardRef}
            className="w-full h-full relative transform-style-3d transition-transform duration-700 ease-out shadow-2xl rounded-3xl"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isOpen ? -180 : 0)}deg)`,
            }}
          >
            
            {/* FRONT OF CARD (COVER) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl backface-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-pink-950/80 border-2 border-pink-500/40 p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-[0_15px_35px_rgba(244,114,182,0.25)] overflow-hidden">
              
              {/* Foil Ribbon Ribbon Accent */}
              <div className="absolute top-0 right-8 w-12 h-24 bg-gradient-to-b from-pink-500 via-rose-400 to-transparent opacity-40 blur-[1px] transform rotate-12" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Cover Top Header */}
              <div className="w-full flex justify-between items-center border-b border-pink-500/20 pb-3">
                <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">10th November</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono">Exclusive Card</span>
              </div>

              {/* 3D Embossed Cover Title */}
              <div className="my-auto space-y-3 sm:space-y-4">
                <div className="text-5xl sm:text-6xl animate-float">👑</div>
                
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight pink-foil leading-tight gold-glow">
                  Happy Birthday <br />
                  <span className="text-white drop-shadow-[0_4px_10px_rgba(244,114,182,0.8)]">Lipsy!</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xs mx-auto">
                  To the wonderful <span className="text-pink-400 font-bold">Mandeep</span>. Tap anywhere to open your interactive 3D birthday surprise!
                </p>
              </div>

              {/* Bottom Interactive Trigger Tag */}
              <div className="w-full pt-4 border-t border-pink-500/20 flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                <span className="text-xs font-semibold text-pink-300 uppercase tracking-widest">
                  Tap To Unfold 💌
                </span>
              </div>
            </div>

            {/* INSIDE OF CARD (INNER PAGES) */}
            <div
              className="absolute inset-0 w-full h-full rounded-3xl backface-hidden rotate-y-180 bg-slate-950 border-2 border-pink-500/40 p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent card closing when clicking inner controls
            >
              
              {/* Inner Tab Navigation */}
              <div className="flex border-b border-slate-800 pb-2 space-x-1">
                {[
                  { id: "wish", label: "✨ Wish", emoji: "💌" },
                  { id: "cake", label: "🎂 3D Cake", emoji: "🕯️" },
                  { id: "quiz", label: "👑 Quiz", emoji: "💖" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playSoundEffect("pop");
                      setActiveTab(tab.id);
                    }}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: PERSONALIZED BIRTHDAY WISH */}
              {activeTab === "wish" && (
                <div className="flex-1 my-3 flex flex-col justify-between space-y-3 overflow-y-auto pr-1">
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">
                        Special Letter
                      </span>
                      <span className="text-xs text-slate-500">Nov 10</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Dearest Mandeep (Lipsy),
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      Wishing you a day filled with endless laughter, gentle joy, and all the love in the world! You possess a warmth that lights up every room and brings a smile to everyone around you.
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      May this new year of your life unlock amazing opportunities, big dreams realized, and non-stop happiness.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-center">
                    <p className="text-xs font-semibold text-pink-300 italic">
                      "Keep shining bright, Lipsy. The world is better with your smile in it!" 🌸
                    </p>
                  </div>

                  <button
                    onClick={handleCardToggle}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium transition cursor-pointer"
                  >
                    ← Fold Card Closed
                  </button>
                </div>
              )}

              {/* TAB 2: INTERACTIVE 3D CAKE & BLOWING CANDLES */}
              {activeTab === "cake" && (
                <div className="flex-1 my-3 flex flex-col items-center justify-between text-center">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-pink-300">
                      Make A Birthday Wish! 🎂
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {isBlown ? "✨ Wish granted for Mandeep!" : "Tap blow button to blow out candles"}
                    </p>
                  </div>

                  {/* 3D Animated Cake Visualization */}
                  <div className="relative my-auto py-2">
                    {/* Candle Flames */}
                    <div className="flex justify-center space-x-6 mb-1">
                      {[1, 2, 3].map((id) => (
                        <div key={id} className="relative flex flex-col items-center">
                          {!isBlown ? (
                            <div className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full animate-flame shadow-[0_0_15px_#f59e0b]" />
                          ) : (
                            <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse opacity-50" />
                          )}
                          <div className="w-1.5 h-5 bg-amber-100 rounded-t-sm shadow-sm" />
                        </div>
                      ))}
                    </div>

                    {/* Cake Base Layers */}
                    <div className="w-48 sm:w-56 h-28 sm:h-32 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-2xl shadow-2xl border-t-4 border-pink-200 p-3 flex flex-col justify-between mx-auto transform hover:scale-105 transition-transform">
                      <div className="flex justify-around">
                        <span className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm" />
                        <span className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm" />
                        <span className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm" />
                      </div>
                      <div className="text-center font-black text-white tracking-widest text-xs uppercase drop-shadow-md">
                        {isBlown ? "🎉 HAPPY BIRTHDAY LIPSY 🎉" : "✨ MAKE A WISH ✨"}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      if (isBlown) {
                        playSoundEffect("pop");
                        setIsBlown(false);
                      } else {
                        handleBlowCandle(e);
                      }
                    }}
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs transition shadow-lg shadow-pink-500/30 active:scale-95 cursor-pointer"
                  >
                    {isBlown ? "Relight Candle Flames 🕯️" : "Blow Candles & Wish 💨"}
                  </button>
                </div>
              )}

              {/* TAB 3: FUN VIBE CHECK QUIZ */}
              {activeTab === "quiz" && (
                <div className="flex-1 my-3 flex flex-col justify-between text-left space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">
                      Birthday Game
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">
                      How awesome is Lipsy on 10/11? 👑
                    </h4>
                  </div>

                  <div className="space-y-2 my-auto">
                    {[
                      { id: 1, text: "100/10 Pure Sunshine ☀️", msg: "Spot on! Mandeep brings total sunshine! 🌸" },
                      { id: 2, text: "Infinite Vibe Champion 🚀", msg: "Correct! Absolute top-tier energy! 🎉" },
                      { id: 3, text: "The Coolest Person Ever ✨", msg: "100% True! Nobody compares! 💖" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          playSoundEffect("chime");
                          setQuizScore(opt.msg);
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer ${
                          quizScore === opt.msg
                            ? "bg-pink-500/20 border-pink-400 text-pink-200"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-pink-500/40"
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {quizScore && (
                    <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-center text-xs text-purple-200 animate-pulse font-semibold">
                      {quizScore}
                    </div>
                  )}

                  <button
                    onClick={handleCardToggle}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium transition cursor-pointer"
                  >
                    Close Card ✉️
                  </button>
                </div>
              )}

              {/* Bottom Footer inside card */}
              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-500">
                <span>Designed for Mandeep</span>
                <span className="text-pink-400 font-semibold">Lipsy 10/11</span>
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-4xl text-center text-xs text-slate-500 py-2 relative z-20">
        Created for <span className="text-pink-400 font-medium">Lipsy (Mandeep)</span> • Happy Birthday November 10th! 🎉
      </footer>
    </div>
  );
}