// Global application state
const AppState = {
  currentScreen: 'landing', // landing, quiz, loading, result, product, checkout
  quizStep: 0,
  quizAnswers: [],
  selectedSize: 'G',
  selectedModel: 'Masculina',
  checkoutStep: 1, // 1=identity, 2=delivery, 3=payment, 4=pix
  deliveryOption: 0,
  upsellActive: false,
  customerData: { name: '', email: '', cpf: '', phone: '' },
  addressData: { cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '' },
  customName: '',
  customNumber: '10',
  pixData: null, // { code, qrBase64, qrImage, transactionId }
  // Timers
  mainTimer: 23 * 3600 + 8 * 60 + 55, // 23:08:55
  resultTimer: 15 * 60, // 15:00
  checkoutTimer: 15 * 60, // 15:00
  remainingSlots: 231,
};

// Route mapping: screen name → URL path
const ROUTES = {
  landing:  '/',
  quiz:     '/quiz',
  loading:  '/loading',
  result:   '/result',
  product:  '/produto',
  checkout: '/checkout',
};

// Reverse: URL path → screen name
const PATH_TO_SCREEN = {};
Object.entries(ROUTES).forEach(([screen, path]) => {
  PATH_TO_SCREEN[path] = screen;
});

function navigate(screen, pushHistory = true) {
  AppState.currentScreen = screen;
  if (pushHistory) {
    const path = ROUTES[screen] || '/';
    history.pushState({ screen }, '', path);
  }
  renderApp();
  window.scrollTo(0, 0);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.screen) {
    navigate(e.state.screen, false);
  } else {
    // Fallback: read from URL
    const screen = PATH_TO_SCREEN[location.pathname] || 'landing';
    navigate(screen, false);
  }
});

// Timer helpers
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function formatTimeMM(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Start global timers
setInterval(() => {
  if (AppState.mainTimer > 0) AppState.mainTimer--;
  if (AppState.resultTimer > 0) AppState.resultTimer--;
  if (AppState.checkoutTimer > 0) AppState.checkoutTimer--;
  
  // Update timer displays without full re-render
  document.querySelectorAll('[data-timer="main"]').forEach(el => {
    el.textContent = formatTime(AppState.mainTimer);
  });
  document.querySelectorAll('[data-timer="result"]').forEach(el => {
    el.textContent = formatTimeMM(AppState.resultTimer);
  });
  document.querySelectorAll('[data-timer="checkout"]').forEach(el => {
    el.textContent = formatTimeMM(AppState.checkoutTimer);
  });
}, 1000);
