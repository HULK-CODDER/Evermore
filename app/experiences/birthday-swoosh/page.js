
"use client";

import { useState } from "react";

const photos = {
  hero: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=90",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  sunset: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  flower: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85",
  sky: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=900&q=85",
  gift: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85",
  night: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=2000&q=90",
};

export default function Home() {
  const [surprise, setSurprise] = useState(false);

  return (
    <main className="evermore">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          background: #fff3ed;
          color: #432541;
          font-family: 'DM Sans', sans-serif;
        }

        .evermore {
          overflow: hidden;
          background: #fff3ed;
        }

        .evermore a { color: inherit; text-decoration: none; }

        .ev-hero {
          min-height: 720px;
          min-height: min(850px, 100svh);
          position: relative;
          display: flex;
          align-items: center;
          padding: 80px 9%;
          isolation: isolate;
          color: #fff7f5;
          background:
            linear-gradient(90deg, rgba(20,17,48,.86), rgba(28,20,52,.57) 43%, rgba(29,20,49,.08)),
            linear-gradient(0deg, rgba(20,16,40,.38), transparent 40%),
            url('${photos.hero}') center 53% / cover;
        }

        .ev-hero:after {
          content: "♡";
          position: absolute;
          z-index: -1;
          right: 14%;
          top: 25%;
          font-size: clamp(45px, 7vw, 90px);
          color: #ffd3e1;
          text-shadow: 0 0 24px #ff8cb9, 0 0 55px #ff8cb9;
          transform: rotate(-12deg);
        }

        .ev-hero-content { max-width: 460px; }

        .ev-brand {
          position: absolute;
          top: 30px;
          left: 7%;
          font: 600 32px 'Caveat', cursive;
          color: #ffc1d6;
        }

        .ev-brand span { margin-right: 8px; }

        .ev-eyebrow {
          color: #ffc2d7;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 700;
        }

        .ev-hero h1 {
          font: 500 clamp(54px, 7vw, 82px)/.98 'Caveat', cursive;
          margin: 22px 0 18px;
          letter-spacing: -1px;
        }

        .ev-hero h1 em {
          color: #ffb0ce;
          font-style: normal;
        }

        .ev-hero p {
          font-size: 15px;
          line-height: 1.95;
          color: #f5eaf3;
          max-width: 370px;
        }

        .ev-signature {
          font: 500 clamp(29px, 4vw, 43px) 'Caveat', cursive;
          color: #ffb5cf;
          margin: 24px 0;
          transform: rotate(-3deg);
        }

        .ev-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          min-height: 49px;
          padding: 0 25px;
          border-radius: 100px;
          background: #f48eb5;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,.55);
          font: 600 12px 'DM Sans', sans-serif;
          box-shadow: 0 7px 25px #f48eb550;
          transition: transform .25s, box-shadow .25s;
          cursor: pointer;
        }

        .ev-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px #f48eb570;
        }

        .ev-paper {
          position: relative;
          padding: 86px max(7%, calc((100% - 1120px) / 2));
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(38px, 8vw, 110px);
          align-items: center;
          background: #fff3ed;
        }

        .ev-paper-blush { background: #fce3ed; }

        .ev-photo-wrap { position: relative; padding: 12px; }

        .ev-polaroid {
          background: #fffaf8;
          padding: 10px 10px 38px;
          box-shadow: 0 8px 28px #58334b20;
          transform: rotate(-7deg);
          max-width: 350px;
          margin: auto;
        }

        .ev-polaroid img {
          width: 100%;
          aspect-ratio: 4 / 3;
          display: block;
          object-fit: cover;
        }

        .ev-tape {
          position: absolute;
          width: 76px;
          height: 22px;
          top: 0;
          left: 40%;
          z-index: 1;
          background: #f5c7aeaa;
          transform: rotate(-8deg);
        }

        .ev-section-number {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #bd6489;
          margin-bottom: 15px;
        }

        .ev-section-number span { padding: 0 8px; }

        .ev-copy h2 {
          font: 500 clamp(34px, 4.2vw, 48px)/1.08 'Caveat', cursive;
          margin: 0 0 19px;
          color: #462346;
        }

        .ev-copy h2 span { color: #c85f91; }

        .ev-copy p {
          font-size: 14px;
          line-height: 1.95;
          color: #625267;
          margin: 0 0 22px;
        }

        .ev-button-dark {
          background: #d75e94;
          border-color: transparent;
        }

        .ev-button-light {
          background: #fff0f4;
          color: #a14a73 !important;
          border-color: #f6c2d5;
          box-shadow: 0 4px 12px #a14a7310;
        }

        .ev-doodle {
          position: absolute;
          color: #d56b9c;
          font: 32px 'Caveat', cursive;
          pointer-events: none;
        }

        .ev-doodle-one { left: 4%; top: 38%; transform: rotate(-18deg); }
        .ev-doodle-two { right: 5%; bottom: 23%; transform: rotate(10deg); }

        .ev-memory-layout {
          grid-template-columns: 1fr 1.2fr;
        }

        .ev-memory-stack {
          position: relative;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ev-memory {
          position: absolute;
          width: 47%;
          background: #fffaf8;
          padding: 8px 8px 29px;
          box-shadow: 0 7px 20px #633c521a;
        }

        .ev-memory img {
          display: block;
          width: 100%;
          height: 190px;
          object-fit: cover;
        }

        .ev-memory small {
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          text-align: center;
          font: 16px 'Caveat', cursive;
          color: #9e577a;
        }

        .ev-memory-a { left: 1%; top: 15px; transform: rotate(-11deg); }
        .ev-memory-b { left: 28%; top: 60px; transform: rotate(5deg); z-index: 2; }
        .ev-memory-c { right: 0; top: 4px; transform: rotate(10deg); }

        .ev-gift {
          background: #fff6e9;
        }

        .ev-gift .ev-photo-wrap { order: 0; }

        .ev-gift .ev-polaroid {
          transform: rotate(5deg);
        }

        .ev-gift .ev-polaroid img { aspect-ratio: 1 / 1; }

        .ev-checklist {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
          font: 23px 'Caveat', cursive;
          color: #a6587e;
          transform: rotate(-3deg);
        }

        .ev-checklist li { margin: 8px 0; }

        .ev-surprise {
          position: relative;
          isolation: isolate;
          min-height: 510px;
          padding: 85px 9%;
          display: flex;
          align-items: center;
          background:
            linear-gradient(90deg, rgba(16,17,48,.92), rgba(17,18,47,.53)),
            url('${photos.night}') center / cover;
          color: #fff5f9;
        }

        .ev-surprise:after {
          content: "♡";
          position: absolute;
          z-index: -1;
          right: 15%;
          top: 15%;
          font-size: clamp(130px, 22vw, 270px);
          color: #ffb0d1;
          text-shadow: 0 0 18px #ff75b9, 0 0 60px #f65da5;
          opacity: .8;
          transform: rotate(-8deg);
        }

        .ev-surprise .ev-copy { max-width: 480px; }
        .ev-surprise .ev-copy h2 { color: #fff0f8; }
        .ev-surprise .ev-copy p { color: #f2e5f1; }
        .ev-surprise .ev-section-number { color: #ffb4d2; }

        .ev-final-message {
          margin-top: 22px;
          color: #ffc0d8;
          font: 32px/1.4 'Caveat', cursive;
          animation: ev-appear .8s ease both;
        }

        .ev-footer {
          text-align: center;
          background: #17142e;
          color: #cbb3cb;
          padding: 25px 16px;
          font-size: 11px;
          letter-spacing: 1px;
        }

        @keyframes ev-appear {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 1500px) {
          .ev-hero { padding-left: max(9%, calc((100% - 1200px) / 2)); }
        }

        @media (max-width: 700px) {
          .ev-hero {
            min-height: 100svh;
            padding: 100px 25px 65px;
            align-items: flex-end;
            background-position: 58% center;
            background-image:
              linear-gradient(0deg, rgba(20,17,43,.93), rgba(20,17,43,.54) 48%, rgba(20,17,43,.12)),
              url('${photos.hero}');
          }

          .ev-brand { top: 24px; left: 23px; font-size: 28px; }

          .ev-hero:after { top: 16%; right: 11%; font-size: 49px; }

          .ev-hero-content { width: 100%; }

          .ev-eyebrow { font-size: 9px; letter-spacing: 2px; }

          .ev-hero h1 { font-size: clamp(54px, 15vw, 76px); margin-top: 17px; }

          .ev-hero p { font-size: 13px; line-height: 1.85; max-width: 330px; }

          .ev-signature { font-size: 34px; margin: 19px 0 25px; }

          .ev-button { min-height: 47px; padding: 0 22px; }

          .ev-paper {
            padding: 57px 25px 64px;
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .ev-photo-wrap { max-width: 310px; width: 100%; margin: 0 auto; }

          .ev-polaroid { max-width: 285px; }

          .ev-copy h2 { font-size: 39px; margin-bottom: 14px; }

          .ev-copy p { font-size: 13px; line-height: 1.9; }

          .ev-doodle { font-size: 25px; }

          .ev-doodle-one { left: 5px; top: 24%; }
          .ev-doodle-two { right: 4px; bottom: 15%; }

          .ev-memory-layout .ev-copy { order: 0; }

          .ev-memory-stack {
            min-height: 265px;
            margin: 0 -5px;
          }

          .ev-memory { width: 43%; padding: 7px 7px 26px; }

          .ev-memory img { height: 155px; }

          .ev-memory-a { left: 2%; top: 15px; }
          .ev-memory-b { left: 29%; top: 42px; }
          .ev-memory-c { right: 1%; top: 9px; }

          .ev-gift .ev-photo-wrap { order: 0; }

          .ev-gift .ev-copy { order: 1; }

          .ev-checklist { font-size: 21px; }

          .ev-surprise {
            min-height: 590px;
            padding: 70px 25px;
            align-items: flex-end;
            background-position: 60% center;
            background-image:
              linear-gradient(0deg, rgba(16,17,48,.95), rgba(16,17,48,.48)),
              url('${photos.night}');
          }

          .ev-surprise:after {
            top: 9%;
            right: 19%;
            font-size: 155px;
          }

          .ev-surprise .ev-copy h2 { font-size: 44px; }

          .ev-final-message { font-size: 29px; }

          .ev-footer { font-size: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .evermore *, .evermore *:before, .evermore *:after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <section className="ev-hero" id="begin">
        <div className="ev-brand"><span>♥</span> evermore</div>
        <div className="ev-hero-content">
          <div className="ev-eyebrow">A little world made just for you</div>
          <h1>Hey you, <em>♡</em></h1>
          <p>
            Today deserves a little more magic.
            A little more wonder. A little more love.
          </p>
          <p>
            So I made this little corner of the internet.
            A place for the smiles, the memories, the
            wishes, and all the beautiful things that
            words sometimes cannot say.
          </p>
          <div className="ev-signature">A little something, just for you ♡</div>
          <a href="#special-day" className="ev-button">
            Let's begin <span>→</span>
          </a>
        </div>
      </section>

      <section className="ev-paper" id="special-day">
        <div className="ev-photo-wrap">
          <div className="ev-tape" />
          <div className="ev-polaroid">
            <img src={photos.cake} alt="A little birthday celebration" />
          </div>
          <span className="ev-doodle ev-doodle-one">♡</span>
        </div>
        <div className="ev-copy">
          <div className="ev-section-number">01 <span>— ♡ —</span></div>
          <h2>Your Special Day <span>♡</span></h2>
          <p>
            Another year of being wonderfully, uniquely you.
            More little adventures, more unexpected smiles,
            more dreams waiting to come true.
            The world is a little brighter because you're in it.
          </p>
          <a href="#moments" className="ev-button ev-button-dark">
            Read your wishes <span>→</span>
          </a>
        </div>
        <span className="ev-doodle ev-doodle-two">you are amazing ♡</span>
      </section>

      <section className="ev-paper ev-paper-blush ev-memory-layout" id="moments">
        <div className="ev-copy">
          <div className="ev-section-number">02 <span>— ♡ —</span></div>
          <h2>Our Little Moments <span>♡</span></h2>
          <p>
            From the silly little things to the moments
            that stay with us. Some memories are loud,
            some are quiet, and some are beautiful
            simply because they happened.
          </p>
          <a href="#little-things" className="ev-button ev-button-light">
            Explore the memories <span>→</span>
          </a>
        </div>
        <div className="ev-memory-stack">
          <div className="ev-memory ev-memory-a">
            <img src={photos.sunset} alt="A golden sunset" />
            <small>Little adventures ♡</small>
          </div>
          <div className="ev-memory ev-memory-b">
            <img src={photos.flower} alt="Flowers in bloom" />
            <small>Good vibes only</small>
          </div>
          <div className="ev-memory ev-memory-c">
            <img src={photos.sky} alt="A beautiful open sky" />
            <small>Stay magical ♡</small>
          </div>
        </div>
      </section>

      <section className="ev-paper ev-gift" id="little-things">
        <div className="ev-photo-wrap">
          <div className="ev-polaroid">
            <img src={photos.gift} alt="A beautifully wrapped gift" />
          </div>
          <span className="ev-doodle ev-doodle-one">✧ ♡ ✧</span>
        </div>
        <div className="ev-copy">
          <div className="ev-section-number">03 <span>— ♡ —</span></div>
          <h2>A Few Little Things For You <span>♡</span></h2>
          <p>
            A tiny collection of wishes for the year ahead.
            Things I hope find their way into your life,
            one lovely day at a time.
          </p>
          <ul className="ev-checklist">
            <li>♡ More reasons to smile</li>
            <li>♡ Little things that feel like magic</li>
            <li>♡ Courage for your biggest dreams</li>
            <li>♡ Love that feels like home</li>
          </ul>
        </div>
      </section>

      <section className="ev-surprise" id="surprise">
        <div className="ev-copy">
          <div className="ev-section-number">04 <span>— ♡ —</span></div>
          <h2>The Big Surprise <span>♡</span></h2>
          <p>
            And here we are, at the last little page
            of this story. Except maybe it's not the end.
            Maybe it's a reminder that you deserve
            beautiful things, today and always.
          </p>
          <button
            className="ev-button"
            onClick={() => setSurprise(!surprise)}
            aria-expanded={surprise}
          >
            {surprise ? "Keep this little moment ♡" : "Open your surprise"} 
            <span>{surprise ? "♥" : "→"}</span>
          </button>

          {surprise && (
            <div className="ev-final-message" role="status">
              If the world ever feels a little too big,
              remember that you make it more beautiful
              just by being in it. ♡
              <br />
              <span style={{ fontSize: 22 }}>
                Here's to all the lovely things still to come.
              </span>
            </div>
          )}
        </div>
      </section>

      <footer className="ev-footer">
        MADE WITH A LITTLE EXTRA LOVE ♡ · EVERMORE
      </footer>
    </main>
  );
}
