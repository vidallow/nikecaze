function renderQuiz() {
  const step = AppState.quizStep;
  const q = QUIZ_DATA[step];
  const pct = step * 20;
  const isLast = step === QUIZ_DATA.length - 1;
  const selectedAnswer = AppState.quizAnswers[step] !== undefined ? AppState.quizAnswers[step] : null;

  let optionsHTML = '';
  if (q.type === 'textarea') {
    const val = typeof selectedAnswer === 'string' ? selectedAnswer : '';
    optionsHTML = `
      <div class="quiz__textarea-wrap">
        <textarea class="quiz__textarea" id="quiz-textarea" 
          placeholder="${q.placeholder}" maxlength="${q.maxChars}">${val}</textarea>
      </div>
      <div class="quiz__char-count"><span id="char-count">${val.length}</span>/${q.maxChars}</div>
    `;
  } else {
    optionsHTML = `<div class="quiz__options">`;
    q.options.forEach((opt, i) => {
      const sel = selectedAnswer === i ? 'selected' : '';
      optionsHTML += `
        <button class="quiz__option ${sel}" data-idx="${i}">
          <span>${opt}</span>
          <span class="quiz__option-radio">${ICONS.check}</span>
        </button>
      `;
    });
    optionsHTML += `</div>`;
  }

  return `
    <div class="screen quiz fade-in">
      <button class="quiz__back" id="quiz-back">
        ${ICONS.arrowLeft} VOLTAR
      </button>
      
      <div class="quiz__progress-header">
        <span class="quiz__progress-label">PERGUNTA ${step + 1} DE 5</span>
        <span class="quiz__progress-pct">${pct}%</span>
      </div>
      <div class="quiz__progress-bar">
        <div class="quiz__progress-fill" style="width:${pct}%"></div>
      </div>

      <div class="quiz__image">
        <img src="${q.image}" alt="Pergunta ${step + 1}" />
      </div>

      <h2 class="quiz__question">${q.question}</h2>

      ${optionsHTML}

      <button class="quiz__next ${isLast ? (typeof selectedAnswer !== 'string' || selectedAnswer.length < 10 ? 'disabled' : '') : (selectedAnswer === null ? 'disabled' : '')}" id="quiz-next">
        ${isLast ? 'FINALIZAR' : 'PRÓXIMA'} ${ICONS.arrow}
      </button>
    </div>
  `;
}

function bindQuizEvents() {
  // Back button
  const backBtn = document.getElementById('quiz-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (AppState.quizStep > 0) {
        AppState.quizStep--;
        navigate('quiz');
      } else {
        navigate('landing');
      }
    });
  }

  // Option selection
  document.querySelectorAll('.quiz__option').forEach(opt => {
    opt.addEventListener('click', () => {
      const idx = parseInt(opt.dataset.idx);
      AppState.quizAnswers[AppState.quizStep] = idx;
      document.querySelectorAll('.quiz__option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      // Enable PRÓXIMA button
      const nextBtn = document.getElementById('quiz-next');
      if (nextBtn) nextBtn.classList.remove('disabled');
    });
  });

  // Textarea
  const ta = document.getElementById('quiz-textarea');
  if (ta) {
    const updateFinalizarState = () => {
      const nextBtn = document.getElementById('quiz-next');
      if (nextBtn) {
        if (ta.value.length >= 10) {
          nextBtn.classList.remove('disabled');
        } else {
          nextBtn.classList.add('disabled');
        }
      }
    };
    ta.addEventListener('input', () => {
      AppState.quizAnswers[AppState.quizStep] = ta.value;
      const cc = document.getElementById('char-count');
      if (cc) cc.textContent = ta.value.length;
      updateFinalizarState();
    });
  }

  // Next button
  const nextBtn = document.getElementById('quiz-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (nextBtn.classList.contains('disabled')) return;
      const step = AppState.quizStep;
      const isLast = step === QUIZ_DATA.length - 1;
      
      if (isLast) {
        navigate('loading');
      } else {
        AppState.quizStep++;
        navigate('quiz');
      }
    });
  }
}
