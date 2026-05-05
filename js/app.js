function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  switch (AppState.currentScreen) {
    case 'landing':
      app.innerHTML = renderLanding();
      bindLandingEvents();
      break;
    case 'quiz':
      app.innerHTML = renderQuiz();
      bindQuizEvents();
      break;
    case 'loading':
      app.innerHTML = renderLoading();
      bindLoadingEvents();
      break;
    case 'result':
      app.innerHTML = renderResult();
      bindResultEvents();
      break;
    case 'product':
      app.innerHTML = renderProduct();
      bindProductEvents();
      break;
    case 'checkout':
      app.innerHTML = renderCheckout();
      bindCheckoutEvents();
      break;
  }
}

// Initialize app — read URL to determine initial screen
document.addEventListener('DOMContentLoaded', () => {
  const initialScreen = PATH_TO_SCREEN[location.pathname] || 'landing';
  AppState.currentScreen = initialScreen;
  history.replaceState({ screen: initialScreen }, '', location.pathname);
  renderApp();
});
