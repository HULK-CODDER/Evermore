"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const chapters = [

  {

    number: "01",

    label: "THE FIRST GLANCE",

    title: "A moment I didn't know I'd remember.",

    date: "Third semester",

    paragraphs: [

      "I first noticed her in my third semester. She was wearing a sky-blue plazo.",

      "It might have been an ordinary day to everyone else. Nothing about that moment announced that it would become a memory I would carry for so long.",

      "But something about her caught my attention. I found myself noticing her, feeling shy around her, and wondering how to turn that quiet attraction into a conversation.",

      "I didn't have a plan. I didn't know what would happen next. I only knew that, somehow, one person had started to stand out in a crowd.",

    ],

    quote:

      "Some beginnings are so quiet that we only recognize them when we look back.",

  },

  {

    number: "02",

    label: "THE LITTLE MOMENTS",

    title: "Everything I wanted to say.",

    date: "The college days",

    paragraphs: [

      "In the beginning, even the smallest interaction could mean something to me. The shyness made it difficult to say what I wanted to say, and the words I imagined were often easier to find in my head than in real life.",

      "There were college days, the pressure of exams, and moments when I knew I might not get another chance to see her for a while.",

      "As the final exams came around, the thought of those days ending made the memories feel different. I was still carrying feelings I had never properly expressed.",

      "Sometimes, what stays with us isn't a grand moment. It's the conversation we were too nervous to start, or the words we kept saving for another day.",

    ],

    quote:

      "I had so much to say, and so many moments when I said so little.",

  },

  {

    number: "03",

    label: "THE DATES THAT STAYED",

    title: "Some days never quite leave you.",

    date: "November 5 · January 19",

    paragraphs: [

      "November 5 and January 19 became dates I associated with seeing her again. They weren't just dates on a calendar to me; they became part of the way I remembered this chapter of my life.",

      "When someone matters to you, an encounter can stay in your mind long after the day itself has passed. You revisit it. You remember the details that seemed small at the time.",

      "My feelings didn't disappear simply because time passed or because life kept moving. I continued to carry them, even when I didn't know what to do with them.",

      "Looking back, I can see how much meaning I had attached to these moments. They were real memories, even if they could not tell me what the future would hold.",

    ],

    quote: "A date can pass. The memory attached to it can stay.",

  },

  {

    number: "04",

    label: "THE THINGS I KEPT INSIDE",

    title: "A feeling is heavier when you carry it alone.",

    date: "Before I reached out",

    paragraphs: [

      "For a long time, these feelings were something I mostly kept to myself. I was shy, uncertain, and never completely sure how to approach the situation.",

      "Eventually, I opened up to a friend I trusted, someone I knew through the gym and work. Saying the things I had been holding inside gave me a way to talk about what was happening instead of keeping every thought to myself.",

      "I was still trying to work out what I wanted to do. Part of me wanted to take a chance; another part was afraid of what the answer might be.",

      "I couldn't know the outcome in advance. I could only decide whether I was ready to be honest about how I felt.",

    ],

    quote:

      "Courage doesn't always mean feeling ready. Sometimes it means speaking while you're still afraid.",

  },

  {

    number: "05",

    label: "THE MESSAGE",

    title: "I finally let the words leave my head.",

    date: "November 9–10",

    paragraphs: [

      "As her birthday approached, I found the courage to reach out to her through her ID. After carrying these feelings for so long, I finally had a way to say what I had been unable to say before.",

      "There is a particular kind of nervousness in sending a message that means much more to you than an ordinary message. You think about the words. You wonder how they will be received. You hope, even when you try to prepare yourself for anything.",

      "I confessed my feelings. I was putting something personal into the open, knowing that I could not decide how another person would respond.",

      "Part of me had imagined possibilities. But an imagined future is not a promise, and the courage to confess does not guarantee the answer we wish for.",

    ],

    quote:

      "For once, I stopped wondering what might happen if I spoke. I spoke.",

  },

  {

    number: "06",

    label: "THE ANSWER",

    title: "Not every feeling finds its way back.",

    date: "After the confession",

    paragraphs: [

      "She rejected me. That was not the answer I had hoped for, and accepting it was painful.",

      "I tried again, still holding on to my feelings. But eventually, I recognized that my attempts were making her uncomfortable.",

      "That realization mattered. My feelings were mine to understand and work through; they were not a reason for her to change her answer or accept something she did not want.",

      "I had to face the difference between wanting something deeply and being entitled to it. I could be honest about my feelings without asking her to carry the responsibility for them.",

    ],

    quote: "My feelings were real. Her answer was real, too.",

  },

  {

    number: "07",

    label: "WHAT I TAKE WITH ME",

    title: "Letting go is not the same as pretending.",

    date: "The chapter that remains",

    paragraphs: [

      "Eventually, I chose to stop pursuing her. Not because I could switch off my feelings whenever I wanted, but because I understood that respecting her decision mattered more than continuing to chase the outcome I had imagined.",

      "I cannot rewrite what happened. I cannot turn rejection into a different answer by wishing hard enough. And I don't want a story in which someone else's boundaries become an obstacle to overcome.",

      "What I can do is remember the person I was when this began, recognize how much I felt, and learn from the things that hurt. I can let the memories belong to my life without asking them to become something else.",

      "She doesn't owe me a different ending. I don't have to hate the beginning just because the ending wasn't what I wanted.",

      "Some stories don't end with two people choosing each other. Some end with one person learning to accept what is, to respect another person's choice, and to keep living beyond the memory.",

    ],

    quote:

      "I can care about what happened without trying to make it happen again.",

  },

];

const chapterColors = ["#b8465a", "#7f526f", "#b87955", "#7d7860", "#b94d67", "#68566f", "#806b5b"];

function HeartArtwork({ variant = 0, className = "" }) {
  const variants = [
    { fill: "currentColor", stroke: "currentColor", strokeWidth: 1.8, small: true },
    { fill: "#fff7f4", stroke: "currentColor", strokeWidth: 2.4, small: false },
    { fill: "currentColor", stroke: "currentColor", strokeWidth: 1.2, small: false },
    { fill: "#f7dfe3", stroke: "currentColor", strokeWidth: 2.2, small: true },
    { fill: "currentColor", stroke: "currentColor", strokeWidth: 1.8, small: true },
    { fill: "#fff7f4", stroke: "currentColor", strokeWidth: 2.5, small: true },
    { fill: "currentColor", stroke: "currentColor", strokeWidth: 1.4, small: false },
  ];
  const v = variants[variant % variants.length];
  return (
    <svg className={`heart-art ${className}`} viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={`heartFill-${variant}`} x1="36" y1="20" x2="185" y2="195" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7d9de"/><stop offset=".55" stopColor="#c96b83"/><stop offset="1" stopColor="#94334f"/>
        </linearGradient>
      </defs>
      <path d="M120 194 C104 179 28 129 27 75 C26 39 66 21 93 43 C105 53 113 63 120 74 C128 61 138 49 151 41 C181 22 214 44 212 78 C210 127 145 177 120 194Z" fill={v.fill === "currentColor" ? `url(#heartFill-${variant})` : v.fill} stroke={v.stroke} strokeWidth={v.strokeWidth} strokeLinejoin="round" />
      <path d="M49 70 C52 52 69 47 82 54" stroke="#fff8f5" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      <path d="M45 95 C52 125 80 148 96 160" stroke="#fff8f5" strokeWidth="2.5" strokeLinecap="round" opacity=".32" />
      {v.small && <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M187 22 C181 13 167 17 169 28 C170 35 180 41 185 44 C191 38 200 31 197 24 C194 16 185 17 187 22Z" fill="#f7dce1" />
        <path d="M36 145 C31 138 20 142 22 151 C23 157 31 162 35 165 C41 160 47 154 44 148 C42 142 35 142 36 145Z" fill="#fff7f4" />
      </g>}
      {variant === 3 && <path d="M66 85 C78 107 100 129 120 143 C144 126 165 106 176 83" stroke="#fff8f4" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />}
      {variant === 5 && <path d="M93 54 C103 66 112 77 120 91 C129 76 139 64 151 52" stroke="#fff8f4" strokeWidth="2.5" strokeLinecap="round" opacity=".85" />}
    </svg>
  );
}

const styles = `
.story-world{--rose:#b8465a;--ink:#38242c;--cream:#fff8f4;min-height:100vh;background:#f6e9e6;color:var(--ink);font-family:Arial,Helvetica,sans-serif;position:relative;overflow-x:hidden;isolation:isolate}
.story-world:before{content:"";position:fixed;inset:0;z-index:-2;background:radial-gradient(ellipse at 18% 12%,rgba(255,255,255,.88),transparent 33%),radial-gradient(ellipse at 86% 80%,rgba(201,128,149,.22),transparent 34%),linear-gradient(135deg,#f9efeb,#f1dfe3 58%,#f8ece6)}
.story-world:after{content:"";position:fixed;inset:0;pointer-events:none;z-index:5;opacity:.12;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E")}
.story-nav{height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(22px,5vw,78px);position:relative;z-index:10;border-bottom:1px solid rgba(101,54,69,.13)}
.story-brand{display:flex;align-items:center;gap:11px;text-decoration:none;color:inherit;font-size:10px;letter-spacing:.22em;font-weight:700}.story-brand-mark{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#fff9f5;border:1px solid rgba(184,70,90,.3);font-family:Georgia,serif;color:#b8465a;font-size:22px;font-weight:400}.story-brand small{display:block;margin-top:5px;font-size:7px;letter-spacing:.2em;color:#987b82;font-weight:400}.story-nav-right{display:flex;align-items:center;gap:22px}.story-counter{font-size:9px;letter-spacing:.18em;color:#987b82}.story-index-button{border:1px solid rgba(120,69,84,.28);background:rgba(255,250,247,.52);border-radius:30px;padding:11px 16px;color:#684450;font-size:9px;letter-spacing:.13em;cursor:pointer;transition:background .2s}.story-index-button:hover{background:#fff9f5}
.story-cover{min-height:calc(100svh - 78px);display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:4vw;padding:clamp(35px,6vw,95px) clamp(24px,8vw,125px) 70px;position:relative}.cover-copy{position:relative;z-index:2;max-width:610px}.cover-eyebrow,.scene-eyebrow{display:flex;align-items:center;gap:11px;font-size:9px;letter-spacing:.22em;color:#a16b78;font-weight:700}.cover-eyebrow:before,.scene-eyebrow:before{content:"";width:27px;height:1px;background:#b8465a}.cover-title{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(66px,9.6vw,140px);line-height:.82;letter-spacing:-.075em;margin:34px 0 28px;color:#4a2935}.cover-title em{font-weight:400;color:#b8465a}.cover-title .cover-title-line{display:block;padding-left:clamp(22px,4vw,60px)}.cover-description{font-family:Georgia,serif;font-size:clamp(16px,1.7vw,21px);line-height:1.7;color:#80616a;max-width:400px;margin:0 0 35px}.cover-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap}.begin-story{border:0;border-radius:40px;background:#9f3d54;color:#fff8f4;display:flex;align-items:center;gap:25px;padding:15px 17px 15px 24px;font-size:9px;font-weight:700;letter-spacing:.14em;cursor:pointer;box-shadow:0 12px 30px rgba(139,49,73,.2);transition:transform .2s,box-shadow .2s}.begin-story:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(139,49,73,.26)}.begin-story span:last-child{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#fff4ef;color:#9f3d54}.cover-small-note{font-family:Georgia,serif;font-style:italic;font-size:13px;color:#a17e87}
.cover-art{height:min(66vw,650px);min-height:380px;max-height:690px;position:relative;display:grid;place-items:center;isolation:isolate}.cover-halo{position:absolute;width:78%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 38% 32%,#fff7f2 0,#f3d6d8 37%,#dfa8b5 64%,rgba(190,99,123,.05) 70%);box-shadow:0 0 90px rgba(191,102,128,.15)}.cover-ring{position:absolute;width:90%;aspect-ratio:1;border:1px solid rgba(156,74,96,.26);border-radius:50%;transform:rotate(-23deg) scaleY(.76)}.cover-ring.ring-two{width:70%;transform:rotate(34deg) scaleY(.82);border-style:dashed;opacity:.65}.cover-heart{position:relative;width:clamp(210px,29vw,410px);height:auto;color:#a7435e;transform:rotate(-9deg);filter:drop-shadow(0 15px 24px rgba(126,40,65,.2))}.heart-art{display:block;width:100%;height:auto;overflow:visible}.scene-symbol{position:relative;z-index:1;width:clamp(150px,23vw,300px);height:auto;color:var(--scene-accent);filter:drop-shadow(0 18px 20px rgba(122,48,70,.14));transform:rotate(-5deg)}.cover-orbit-note{position:absolute;font-size:8px;letter-spacing:.2em;color:#9d6e7a}.orbit-note-one{top:14%;right:2%}.orbit-note-two{bottom:12%;left:3%}.cover-spark{position:absolute;color:#fff9f3;font-size:25px;text-shadow:0 0 14px #b8465a}.spark-one{top:20%;left:20%}.spark-two{right:18%;bottom:25%;font-size:17px}.cover-sticker{position:absolute;bottom:12%;right:6%;width:100px;height:100px;border-radius:50%;background:#fff8f1;display:grid;place-items:center;text-align:center;color:#9e455d;font-family:Georgia,serif;font-style:italic;font-size:13px;line-height:1.2;box-shadow:0 12px 40px rgba(97,43,58,.12);transform:rotate(9deg);border:1px solid rgba(184,70,90,.15)}.cover-bottom{position:absolute;left:clamp(24px,8vw,125px);right:clamp(24px,8vw,125px);bottom:22px;display:flex;justify-content:space-between;color:#ad8790;font-size:8px;letter-spacing:.17em}.cover-bottom span{display:flex;align-items:center;gap:9px}
.story-index-panel{position:absolute;z-index:20;top:78px;left:0;right:0;background:rgba(255,247,243,.97);backdrop-filter:blur(20px);padding:28px clamp(24px,8vw,125px) 35px;border-bottom:1px solid rgba(101,54,69,.15);box-shadow:0 20px 60px rgba(87,41,56,.08)}.index-panel-head{display:flex;justify-content:space-between;color:#a16b78;font-size:8px;letter-spacing:.2em;margin-bottom:12px}.story-index-row{width:100%;display:grid;grid-template-columns:48px minmax(0,1fr) 30px;align-items:center;gap:15px;text-align:left;padding:15px 0;border:0;border-top:1px solid rgba(101,54,69,.12);background:transparent;cursor:pointer;color:#4a2935}.story-index-row:hover .index-row-title{color:#b8465a}.index-row-num{font-family:Georgia,serif;font-size:25px;color:#c58b99}.index-row-title{font-family:Georgia,serif;font-size:clamp(17px,2.3vw,25px);transition:color .2s}.index-row-label{font-size:8px;letter-spacing:.16em;color:#a16b78;margin-bottom:5px}
.story-scene{min-height:calc(100svh - 78px);padding:clamp(28px,5vw,70px) clamp(20px,6vw,95px) 28px;position:relative;display:flex;flex-direction:column;--scene-accent:#b8465a}.scene-topline{display:flex;align-items:center;justify-content:space-between;gap:12px;color:#a16b78;font-size:8px;letter-spacing:.18em;position:relative;z-index:1}.scene-topline button{border:0;background:transparent;color:#a16b78;font-size:8px;letter-spacing:.15em;cursor:pointer;display:flex;align-items:center;gap:8px}.scene-main{flex:1;display:grid;grid-template-columns:minmax(220px,.82fr) minmax(0,1.18fr);align-items:center;gap:clamp(28px,6vw,100px);max-width:1400px;width:100%;margin:0 auto;padding:35px 0 45px}.scene-visual{position:relative;min-height:440px;display:grid;place-items:center;isolation:isolate}.scene-visual:before{content:"";position:absolute;width:min(34vw,420px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff9f4 0,#f4d8d9 45%,#dfabb9 75%,rgba(198,113,137,.05) 76%);box-shadow:0 25px 80px rgba(147,65,88,.12)}.scene-visual:after{content:"";position:absolute;width:min(40vw,480px);aspect-ratio:1;border:1px solid rgba(162,75,98,.25);border-radius:50%;transform:rotate(-27deg) scaleY(.7)}.scene-symbol{position:relative;z-index:1;font-family:Georgia,serif;font-size:clamp(120px,20vw,260px);line-height:1;color:var(--scene-accent);text-shadow:0 18px 35px rgba(122,48,70,.15);transform:rotate(-10deg)}.scene-visual-number{position:absolute;z-index:2;bottom:10%;left:4%;font-family:Georgia,serif;font-size:clamp(55px,8vw,100px);letter-spacing:-.08em;color:rgba(125,58,78,.2)}.scene-orbit-caption{position:absolute;z-index:2;top:12%;right:0;font-size:7px;letter-spacing:.2em;color:#a16b78;writing-mode:vertical-rl}.scene-text{max-width:680px;position:relative;z-index:2}.scene-eyebrow{font-size:8px}.scene-title{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(42px,6vw,84px);line-height:.98;letter-spacing:-.06em;color:#4a2935;margin:22px 0 20px}.scene-date{font-family:Georgia,serif;font-style:italic;color:#b17c89;font-size:14px;margin-bottom:28px}.scene-story{border-left:1px solid rgba(184,70,90,.35);padding-left:clamp(18px,2.5vw,32px);max-width:620px}.scene-paragraph{font-family:Georgia,'Times New Roman',serif;font-size:clamp(14px,1.15vw,16px);line-height:1.8;color:#765660;margin:0 0 13px}.scene-quote{font-family:Georgia,'Times New Roman',serif;font-size:clamp(19px,2.2vw,29px);font-style:italic;line-height:1.3;color:#a3425a;margin:27px 0 0;padding-top:18px;position:relative}.scene-quote:before{content:"“";font-size:46px;line-height:.5;display:block;color:#d29ba8;margin-bottom:8px}.scene-footer{max-width:1400px;width:100%;margin:0 auto;border-top:1px solid rgba(101,54,69,.15);padding-top:18px;display:flex;align-items:center;gap:20px}.scene-progress-label{font-size:8px;letter-spacing:.16em;color:#a16b78;white-space:nowrap}.scene-progress{display:flex;gap:6px;flex:1}.scene-progress button{height:3px;border:0;border-radius:10px;background:rgba(163,66,90,.18);flex:1;cursor:pointer;padding:0;transition:background .25s,transform .25s}.scene-progress button.current{background:#a3425a;transform:scaleY(1.8)}.scene-nav-buttons{display:flex;gap:8px}.scene-nav-buttons button{width:37px;height:37px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(120,69,84,.26);background:rgba(255,250,247,.45);color:#8d455a;cursor:pointer;transition:background .2s}.scene-nav-buttons button:hover{background:#fff8f4}.scene-end{min-height:calc(100svh - 78px);display:grid;place-items:center;text-align:center;padding:60px 24px;position:relative}.scene-end-inner{max-width:720px;position:relative;z-index:1}.end-heart{font-family:Georgia,serif;font-size:80px;line-height:1;color:#b8465a;text-shadow:0 12px 30px rgba(184,70,90,.17)}.end-title{font-family:Georgia,serif;font-weight:400;font-size:clamp(43px,7vw,90px);line-height:.98;letter-spacing:-.06em;margin:20px 0;color:#4a2935}.end-copy{font-family:Georgia,serif;font-size:17px;line-height:1.8;color:#80616a;max-width:560px;margin:0 auto 28px}.end-restart{border:1px solid rgba(120,69,84,.3);background:rgba(255,250,247,.55);border-radius:30px;padding:14px 20px;color:#8d455a;font-size:9px;letter-spacing:.14em;cursor:pointer}
@media(max-width:900px){.story-cover{grid-template-columns:1fr;min-height:auto;padding-top:70px;padding-bottom:75px}.cover-copy{max-width:700px}.cover-title{font-size:clamp(70px,13vw,120px)}.cover-art{position:absolute;right:-9%;top:7%;width:48%;height:60%;min-height:300px;opacity:.45;z-index:0}.cover-copy{z-index:2}.cover-description{max-width:350px}.scene-main{grid-template-columns:.65fr 1.35fr;gap:28px}.scene-visual{min-height:340px}.scene-visual:before{width:100%}.scene-visual:after{width:115%}.scene-symbol{width:clamp(150px,23vw,230px)}}
@media(max-width:620px){.story-nav{height:65px;padding:0 17px}.story-brand{font-size:8px;letter-spacing:.16em}.story-brand-mark{width:30px;height:30px;font-size:19px}.story-brand small{font-size:6px}.story-nav-right{gap:9px}.story-counter{display:none}.story-index-button{padding:10px 12px;font-size:8px}.story-index-panel{top:65px;padding:20px 19px 25px}.story-index-row{grid-template-columns:33px minmax(0,1fr) 22px;gap:10px;padding:13px 0}.index-row-num{font-size:21px}.index-row-title{font-size:17px}.index-row-label{font-size:7px}.story-cover{min-height:calc(100svh - 65px);padding:55px 22px 65px;display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:0}.cover-eyebrow{font-size:7px;letter-spacing:.16em}.cover-title{font-size:clamp(62px,17vw,98px);margin:32px 0 24px;line-height:.86;max-width:100%}.cover-title .cover-title-line{padding-left:23px}.cover-description{font-size:16px;line-height:1.65;max-width:310px;margin-bottom:26px}.cover-actions{gap:13px}.begin-story{padding:10px 11px 10px 17px;gap:18px;font-size:8px}.begin-story span:last-child{width:30px;height:30px}.cover-small-note{font-size:11px}.cover-art{width:78%;height:48%;min-height:270px;right:-18%;top:9%;opacity:.22}.cover-heart{width:230px}.cover-sticker{width:74px;height:74px;font-size:10px}.cover-bottom{left:22px;right:22px;bottom:18px;font-size:6px;letter-spacing:.11em}.cover-bottom span:last-child{display:none}.story-scene{min-height:calc(100svh - 65px);padding:20px 18px 18px}.scene-topline{font-size:7px;letter-spacing:.12em}.scene-topline button{font-size:7px;gap:5px}.scene-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;padding:10px 0 28px}.scene-visual{min-height:205px;max-height:220px;flex:none;margin:0 -5px}.scene-visual:before{width:180px}.scene-visual:after{width:205px}.scene-symbol{width:140px}.scene-visual-number{font-size:53px;bottom:0;left:2%}.scene-orbit-caption{right:7%;top:8%;font-size:6px}.scene-text{max-width:none}.scene-eyebrow{font-size:7px;letter-spacing:.16em}.scene-title{font-size:clamp(39px,11vw,58px);margin:16px 0 13px;line-height:.99}.scene-date{font-size:12px;margin-bottom:18px}.scene-story{padding-left:14px}.scene-paragraph{font-size:14px;line-height:1.68;margin-bottom:11px}.scene-quote{font-size:21px;margin-top:20px;padding-top:12px}.scene-quote:before{font-size:38px}.scene-footer{gap:9px;padding-top:13px}.scene-progress-label{font-size:7px;letter-spacing:.1em}.scene-progress{gap:3px}.scene-nav-buttons{gap:5px}.scene-nav-buttons button{width:31px;height:31px}.scene-end{min-height:calc(100svh - 65px);padding:50px 24px}.end-heart{font-size:65px}.end-title{font-size:clamp(42px,12vw,64px)}.end-copy{font-size:15px}.end-restart{font-size:8px}}
@media(prefers-reduced-motion:reduce){.story-world *, .story-world *:before,.story-world *:after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;

export default function StoryArcPage() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showIndex, setShowIndex] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = activeIndex >= 0 ? chapters[activeIndex] : null;
  const accent = active ? chapterColors[activeIndex] : chapterColors[0];

  const selectChapter = (index) => {
    setActiveIndex(index);
    setShowIndex(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };
  const nextChapter = () => selectChapter(activeIndex < 0 ? 0 : Math.min(activeIndex + 1, chapters.length));
  const previousChapter = () => selectChapter(Math.max(0, activeIndex - 1));

  return (
    <main className="story-world" style={{ "--scene-accent": accent }}>
      <style>{styles}</style>
      <header className="story-nav">
        <a className="story-brand" href="/" aria-label="Evermore home"><span className="story-brand-mark">e.</span><span>EVERMORE<small>A STORY CLOSE TO THE HEART</small></span></a>
        <div className="story-nav-right"><span className="story-counter">A LITTLE STORY · 7 MOMENTS</span><button className="story-index-button" onClick={() => setShowIndex(!showIndex)}>{showIndex ? "CLOSE ✕" : "CHAPTERS +"}</button></div>
      </header>

      <AnimatePresence>
        {showIndex && <motion.aside className="story-index-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .22 }}>
          <div className="index-panel-head"><span>THE LITTLE MOMENTS</span><span>CHOOSE A CHAPTER</span></div>
          {chapters.map((chapter, index) => <button className="story-index-row" key={chapter.number} onClick={() => selectChapter(index)}><span className="index-row-num">{chapter.number}</span><span><span className="index-row-label">{chapter.label}</span><span className="index-row-title">{chapter.title}</span></span><ArrowRight size={17} /></button>)}
        </motion.aside>}
      </AnimatePresence>

      {activeIndex < 0 ? (
        <motion.section className="story-cover" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7 }}>
          <div className="cover-copy">
            <div className="cover-eyebrow">A STORY THAT MEANT SOMETHING</div>
            <h1 className="cover-title">Somewhere<br />between <em>hello</em><span className="cover-title-line">and goodbye.</span></h1>
            <p className="cover-description">A little story about a girl, the words I kept inside, and the moments that stayed with me long after they passed.</p>
            <div className="cover-actions"><button className="begin-story" onClick={() => selectChapter(0)}><span>LET ME TELL YOU</span><span><ArrowRight size={17} /></span></button><span className="cover-small-note">read slowly, with your heart ♡</span></div>
          </div>
          <motion.div className="cover-art" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: .85, rotate: -7 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: .15 }}><div className="cover-halo"/><div className="cover-ring"/><div className="cover-ring ring-two"/><HeartArtwork variant={0} className="cover-heart" /><span className="cover-orbit-note orbit-note-one">A MEMORY, KEPT GENTLY</span><span className="cover-orbit-note orbit-note-two">THE THINGS I NEVER SAID</span><span className="cover-spark spark-one">♡</span><span className="cover-spark spark-two">♥</span><div className="cover-sticker">a piece<br/>of my heart</div></motion.div>
          <div className="cover-bottom"><span>♡ &nbsp; SEVEN CHAPTERS, ONE HONEST HEART</span><span>SCROLL THROUGH A MEMORY</span></div>
        </motion.section>
      ) : activeIndex >= chapters.length ? (
        <motion.section className="scene-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="scene-end-inner"><div className="end-heart">♡</div><h1 className="end-title">Some stories stay<br/><em>with us.</em></h1><p className="end-copy">Not every story becomes the future we once imagined. Some become part of who we are — quietly, honestly, and with a little more understanding than before.</p><button className="end-restart" onClick={() => selectChapter(0)}>↺ &nbsp; READ THE STORY AGAIN</button></div>
        </motion.section>
      ) : (
        <motion.section className="story-scene" key={active.number} style={{ "--scene-accent": chapterColors[activeIndex] }} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35 }}>
          <div className="scene-topline"><button onClick={() => setActiveIndex(-1)}>← &nbsp; BACK TO THE BEGINNING</button><span>CHAPTER {active.number} OF 07</span></div>
          <div className="scene-main">
            <motion.div className="scene-visual" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: .9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .7 }}><span className="scene-orbit-caption">A MOMENT I STILL REMEMBER</span><span className="scene-visual-number">{active.number}</span><HeartArtwork variant={activeIndex} className="scene-symbol" /></motion.div>
            <div className="scene-text"><div className="scene-eyebrow">{active.label}</div><h1 className="scene-title">{active.title}</h1><div className="scene-date">{active.date}</div><div className="scene-story">{active.paragraphs.map((paragraph, index) => <motion.p className="scene-paragraph" key={`${active.number}-${index}`} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : .12 + index * .12, duration: .45 }}>{paragraph}</motion.p>)}</div><motion.blockquote className="scene-quote" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : .45, duration: .4 }}>{active.quote}</motion.blockquote></div>
          </div>
          <div className="scene-footer"><span className="scene-progress-label">OUR STORY</span><div className="scene-progress">{chapters.map((chapter, index) => <button key={chapter.number} className={index === activeIndex ? "current" : ""} onClick={() => selectChapter(index)} aria-label={`Go to chapter ${chapter.number}`} />)}</div><div className="scene-nav-buttons"><button onClick={previousChapter} aria-label="Previous chapter" disabled={activeIndex === 0}><ArrowLeft size={16}/></button><button onClick={nextChapter} aria-label="Next chapter"><ArrowRight size={16}/></button></div></div>
        </motion.section>
      )}
    </main>
  );
}
