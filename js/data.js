// Quiz questions data
const QUIZ_DATA = [
  {
    image: 'imgs/Captura de Tela 2026-05-03 às 22.51.44.png',
    question: 'Qual apresentador é o rosto da CazéTV?',
    options: ['Galvão Bueno', 'Casimiro Miguel', 'Cléber Machado', 'Tiago Leifert'],
    correct: 1
  },
  {
    image: 'imgs/Captura de Tela 2026-05-03 às 22.51.58.png',
    question: 'Onde você vai assistir aos jogos da Copa 2026?',
    options: ['CazéTV', 'TV Globo', 'SporTV', 'Globoplay'],
    correct: 0
  },
  {
    image: 'imgs/Captura de Tela 2026-05-03 às 22.52.37.png',
    question: 'Quantos títulos da Copa do Mundo o Brasil tem?',
    options: ['3', '4', '5', '6'],
    correct: 2
  },
  {
    image: 'imgs/Captura de Tela 2026-05-03 às 22.52.50.png',
    question: 'Qual o slogan mundialmente conhecido da Nike?',
    options: ['Impossible Is Nothing', 'Just Do It', "I'm Lovin' It", 'Think Different'],
    correct: 1
  },
  {
    type: 'textarea',
    image: 'imgs/Captura de Tela 2026-05-03 às 22.53.18.png',
    question: 'Por que você merece receber essa camisa?',
    placeholder: 'Conte sua história de torcedor em poucas palavras...',
    maxChars: 500
  }
];

// Product images for gallery — using carousel art folder
const PRODUCT_IMAGES = [
  'carrosel/CARROSEL1.webp',
  'carrosel/CARROSEL2.webp',
  'carrosel/CARROSEL3.webp',
  'carrosel/CARROSEL4.webp',
];

const SIZES = ['PP', 'P', 'M', 'G', 'GG'];

// Fan review images (vantagens no jogo)
const REVIEW_IMAGES = [
  'av torcedores/CARROSEL DE BAIXO1.webp',
  'av torcedores/CARROSEL DE BAIXO 2.webp',
  'av torcedores/CARROSEL de baixo 3.webp',
];

const DELIVERY_OPTIONS = [
  { name: 'Transportadora', time: '15 a 20 dias úteis', price: 24.90, badge: null },
  { name: 'Sedex', time: '3 a 6 dias úteis', price: 34.90, badge: 'MAIS ESCOLHIDO' },
  { name: 'Entrega Relâmpago', time: 'Em até 24h via motoboy da loja mais próxima', price: 49.90, badge: null },
];

// SVG Icons
const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  pix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13.5 10.5l-1-1a2.12 2.12 0 00-3 0L6 13a2.12 2.12 0 000 3l1.5 1.5"/><path d="M10.5 13.5l1 1a2.12 2.12 0 003 0L18 11a2.12 2.12 0 000-3L16.5 6.5"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20v2"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 19.24 17 20v2"/><path d="M18 2H6v7a6 6 0 1012 0V2z"/></svg>',
  package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
};

// Nike logo SVG (simple swoosh-inspired)
const NIKE_LOGO_SVG = `<svg viewBox="0 0 69 32" fill="currentColor" style="height:22px;width:auto;"><path d="M68.56 4.06c-.28-.1-.97-.28-1.81-.28-2.44 0-4.34 1.25-5.56 3.16l-6.72 11.81-.38.69h-.06l-.06-.06-.12-.38L50.3 4.69c-.5-1.5-1.47-2.69-3.41-2.69-.97 0-2.25.38-3.28 1.25l-2.16 1.94.38.62 1.09-.94c.44-.34.81-.47 1.19-.47.62 0 .91.47 1.16 1.25l4.56 15.62c.25.84.12 1.53-.41 2.22l-.84 1.06c-1.34 1.69-3.09 2.69-4.47 2.69-.81 0-1.31-.38-1.31-1.06 0-.47.16-.97.47-1.59l5.31-10.47c.44-.84.22-1.53-.5-2.06L42 7.75c-1.69-1.28-3.47-1.94-5.47-1.94-4 0-7.47 2.94-9.47 6.09L15.84 28.88c-.97 1.56-2.38 3-4.22 3-1.19 0-2.06-.66-2.06-2 0-.81.28-1.81.81-2.88L21.66 5.5c-.56.03-3.09.38-4.78 1.56-.91.62-1.56 1.47-2.22 2.59L3.41 28.13C1.22 32 0 32 0 32l.19.03c2.41 0 5.16-1.53 7.12-4.78l8.53-14.22c1.56-2.66 4.03-5.28 6.59-5.28 1.28 0 2.31.72 3.22 1.56l3.47 3.16c.41.38.47.66.22 1.12l-5.5 10.78c-.56 1.12-.84 2.22-.84 3.16 0 2.28 1.69 3.72 4.09 3.72 2.84 0 5.31-1.69 7.16-4l.97-1.22c.47-.62.59-1.16.34-1.97l-4.22-14.19 7.41-12.91c1.5-2.56 3.72-4.44 6.56-4.44.81 0 1.47.16 1.78.38l.06-.06 2.06-2.47-.56-.22z"/></svg>`;

const CAZETV_LOGO = `<img src="imgs/Captura de Tela 2026-05-03 às 22.51.44.png" style="height:28px;width:28px;border-radius:50%;object-fit:cover;" alt="CazéTV">`;
