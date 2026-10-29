// Everything you may want to edit lives in this file.

export const CFG = {
  name: 'Lipsy',
  // Midnight at the start of 10 November 2026, Germany time.
 target: '2026-11-10T00:00:00',
  letter: [
    'Some people walk into a room and it gets a little warmer. I think you are one of them.',
    'A message felt too small for your birthday, so I built you a sky. Every star in it is a wish, and I meant each one.',
    'You do not owe me anything for this. No reply needed, no reaction needed. I only wanted your day to begin with something made on purpose, just for you.',
    'Have the kind of birthday that makes the whole year look good.',
  ],
  sign: 'Happy birthday, Lipsy.',

  // Optional. Put your WhatsApp number with country code and no plus or spaces
  // (for example '918699675443') and a small "Say thanks" button appears under
  // the letter. Leave it as '' to hide the button.
  replyWhatsApp: '',
  replyText: 'Thank you for the sky. It made my day.',
};

export const STARS = [
  { x: 84, y: 48, name: 'Graffias', wish: 'May this year say yes to the things you have been quietly hoping for.' },
  { x: 116, y: 96, name: 'Dschubba', wish: 'May your chai always be hot and your mornings start a little late.' },
  { x: 150, y: 160, name: 'Antares, the heart of the scorpion', wish: 'May you always know how bright you are, even on the nights you cannot see it yourself.' },
  { x: 178, y: 222, name: 'Alniyat', wish: 'May the people you love stay close, and the ones far away call more often.' },
  { x: 204, y: 284, name: 'Larawag', wish: 'May you laugh so hard this year that you forget what was funny.' },
  { x: 232, y: 346, name: 'Zeta Scorpii', wish: 'May every plan you make leave room for a spontaneous one.' },
  { x: 290, y: 384, name: 'Sargas', wish: 'May you always have a song that fits the exact mood you are in.' },
  { x: 344, y: 352, name: 'Girtab', wish: 'May you hear "you did great" far more often than you expect to.' },
  { x: 352, y: 292, name: 'Shaula, the sting', wish: 'May your hard days be short, and your good days come back again and again.' },
];

// One soft bell note per star (C major pentatonic).
export const NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];

export const STORAGE_KEY = 'lipsy-sky-lit';
