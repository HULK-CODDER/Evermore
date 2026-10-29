"use client";

import React, { useState, useEffect, useRef } from "react";

export default function BirthdayWish() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const audioRef = useRef(null);

  // Generate confetti on mount
  useEffect(() => {
    const colors = ["#f472b6", "#fb7185", "#c084fc", "#60a5fa", "#facc15", "#4ade80", "#ff80bf"];
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      size: `${6 + Math.random() * 10}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    }));
    setConfetti(pieces);
  }, []);

  // Floating ambient hearts generator
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          left: `${10 + Math.random() * 80}%`,
          size: `${14 + Math.random() * 16}px`,
          duration: `${4 + Math.random() * 3}s`,
        },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const galleryMemories = [
    {
      title: "Radiant Smile ✨",
      caption: "Your smile has this magical way of making everything around you brighter and happier.",
      gradient: "from-pink-500 to-rose-400",
      emoji: "🌸",
    },
    {
      title: "Pure Grace 💫",
      caption: "Mandeep — a name that carries such elegance, warmth, and an unstoppable vibrant spirit.",
      gradient: "from-purple-500 to-indigo-400",
      emoji: "💖",
    },
    {
      title: "Unstoppable Energy 🌟",
      caption: "Whether it's your wit or your charm, you make every moment unforgettable.",
      gradient: "from-amber-400 to-pink-500",
      emoji: "👑",
    },
  ];

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg"); // Fallback serene ambient sound or birthday chime effect
      audioRef.current.loop = true;
    }
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#070913] text-slate-100 font-sans relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Embedded CSS Keyframes & Responsive Enhancements */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.6); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-float-heart {
          animation: floatUp linear forwards;
        }
        .animate-float {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-confetti {
          animation: confettiFall linear infinite;
        }
        .animate-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-panel-hover:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(244, 114, 182, 0.3);
        }
      `}</style>

      {/* Floating Ambient Hearts Container */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-400/40 animate-float-heart select-none"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Confetti Falling Layer */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute opacity-70 animate-confetti"
            style={{
              left: item.left,
              width: item.size,
              height: item.size,
              backgroundColor: item.backgroundColor,
              animationDelay: item.animationDelay,
              animationDuration: item.animationDuration,
              borderRadius: item.borderRadius,
            }}
          />
        ))}
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-pink-600/20 via-rose-500/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-glow" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Music Toggle Floating Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="glass-panel px-3.5 py-2 rounded-full text-xs font-medium flex items-center space-x-2 text-pink-300 hover:text-white shadow-lg active:scale-95 transition-all border border-pink-500/30"
          aria-label="Toggle Sound"
        >
          <span>{musicPlaying ? "🎶 Music On" : "🔇 Sound Off"}</span>
        </button>
      </div>

      {/* Main Responsive Wrapper */}
      <div className="relative z-20 max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
        
        {/* Header Badge & Title */}
        <header className="text-center mb-8 sm:mb-12 space-y-3 w-full">
          <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium tracking-wide shadow-inner">
            <span>🎂</span>
            <span>November 10th Special</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 drop-shadow-sm">
            Happy Birthday, Lipsy! 🎉
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light">
            To the incredible <span className="text-pink-400 font-semibold">Mandeep</span> — may your day sparkle! ✨
          </p>
        </header>

        {/* Interactive Cake Section */}
        <div className="w-full mb-8 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />
          
          <h2 className="text-sm uppercase tracking-wider text-pink-400 font-semibold mb-4">
            Birthday Cake Tradition 🎂
          </h2>

          <div className="relative inline-block my-4">
            {/* Flames */}
            <div className="flex justify-center space-x-8 mb-2">
              {[1, 2, 3].map((id) => (
                <div key={id} className="relative flex flex-col items-center">
                  {!candlesBlown ? (
                    <div className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full animate-bounce shadow-[0_0_16px_#f59e0b]" />
                  ) : (
                    <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse opacity-60" />
                  )}
                  <div className="w-1.5 h-5 bg-slate-300/80 rounded-t-sm" />
                </div>
              ))}
            </div>

            {/* Cake Body */}
            <div className="w-52 sm:w-60 h-32 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-2xl shadow-xl flex flex-col justify-between p-4 border-t-4 border-pink-200 mx-auto transform transition-transform group-hover:scale-[1.02]">
              <div className="flex justify-around">
                <span className="w-6 h-6 bg-white/25 rounded-full backdrop-blur-sm" />
                <span className="w-6 h-6 bg-white/25 rounded-full backdrop-blur-sm" />
                <span className="w-6 h-6 bg-white/25 rounded-full backdrop-blur-sm" />
              </div>
              <div className="text-center font-bold text-white tracking-widest text-xs sm:text-sm uppercase drop-shadow">
                {candlesBlown ? "✨ Wish Made! ✨" : "Make A Wish, Mandeep"}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setCandlesBlown(!candlesBlown)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:opacity-95 text-white font-medium text-sm transition-all shadow-lg shadow-pink-500/25 active:scale-95 cursor-pointer"
            >
              {candlesBlown ? "Relight Candles 🕯️" : "Blow Out Candles 💨"}
            </button>
          </div>
        </div>

        {/* Interactive Love & Birthday Letter Card */}
        <div className="w-full mb-8">
          {!isOpen ? (
            <div
              onClick={() => setIsOpen(true)}
              className="glass-panel glass-panel-hover rounded-3xl p-7 sm:p-8 text-center cursor-pointer transition-all duration-300 shadow-xl border border-pink-500/20 group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                💌
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-pink-300 mb-1">
                Tap to open your birthday letter
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                A special note crafted just for Lipsy ✨
              </p>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 sm:p-9 border border-pink-500/30 shadow-2xl relative animate-float">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs px-3 py-1 rounded-full bg-slate-800/60 transition"
              >
                Close ✖
              </button>
              <div className="space-y-4 text-left pt-2">
                <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
                  November 10th Note
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Dear Lipsy (Mandeep),
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  On your special day, I wanted to put together something as unique and wonderful as you are. Your presence brings so much genuine warmth, positivity, and smiles to everyone around you.
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  May this year bring you closer to all your big dreams, fill your days with endless laughter, and reward you with all the incredible success you truly deserve.
                </p>
                <p className="text-pink-300 font-semibold italic pt-2 text-sm sm:text-base">
                  Have the absolute best birthday ever! 🎉💖
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Mini Quiz / Fun Question */}
        <div className="w-full mb-8 glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <h3 className="text-base font-bold text-slate-200 text-center mb-3">
            Quick Vibe Check for Mandeep 👑
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 text-center mb-5">
            How fabulous is Lipsy today?
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setQuizAnswer("Infinite! ✨")}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-medium transition border ${
                quizAnswer === "Infinite! ✨"
                  ? "bg-pink-500 text-white border-pink-400 shadow-lg shadow-pink-500/30"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-pink-500/40"
              }`}
            >
              100/10 Infinitely Fabulous ✨
            </button>
            <button
              onClick={() => setQuizAnswer("Out of this world! 🚀")}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-medium transition border ${
                quizAnswer === "Out of this world! 🚀"
                  ? "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/30"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-purple-500/40"
              }`}
            >
              Absolute Queen Energy 👑
            </button>
          </div>

          {quizAnswer && (
            <div className="mt-4 p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-center text-pink-300 text-xs sm:text-sm animate-pulse">
              Correct! You chose: <span className="font-bold">{quizAnswer}</span> 🎉
            </div>
          )}
        </div>

        {/* Memories / Highlights Carousel */}
        <div className="w-full mb-8 glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
          <h3 className="text-base font-bold text-slate-200 text-center mb-5">
            Moments & Birthday Wishes 🌸
          </h3>

          <div className="relative overflow-hidden rounded-2xl min-h-[170px] sm:min-h-[190px] flex items-center justify-center p-6 bg-slate-900/50 border border-slate-800/80">
            <div className="text-center space-y-3 max-w-md">
              <span className="text-3xl inline-block mb-1">{galleryMemories[currentSlide].emoji}</span>
              <div className={`inline-block px-3 py-1 rounded-md text-xs font-bold text-white bg-gradient-to-r ${galleryMemories[currentSlide].gradient}`}>
                {galleryMemories[currentSlide].title}
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                "{galleryMemories[currentSlide].caption}"
              </p>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-5 px-1">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + galleryMemories.length) % galleryMemories.length)}
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition border border-slate-800 cursor-pointer"
            >
              ← Prev
            </button>
            
            <div className="flex space-x-1.5">
              {galleryMemories.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? "bg-pink-500 w-6" : "bg-slate-800 w-2"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % galleryMemories.length)}
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition border border-slate-800 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-xs py-4 space-y-1">
          <p>Created with ❤️ for Lipsy (Mandeep)</p>
          <p className="text-[10px] text-slate-600">November 10th • Special Edition</p>
        </footer>

      </div>
    </main>
  );
}