/* 在线小测 - 答题、判分、本地成绩 */
(function () {
  'use strict';

  var STORE_KEY = 'chem-quiz-history-v1';

  var viewList = document.getElementById('view-list');
  var viewQuiz = document.getElementById('view-quiz');
  var viewResult = document.getElementById('view-result');
  var quizListEl = document.getElementById('quiz-list');
  var questionsEl = document.getElementById('questions');
  var reviewEl = document.getElementById('review');

  var current = null; // 正在做的 quiz

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveHistory(h) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(h)); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 填空题答案归一化：去空格、全角转半角、下标数字转普通数字
  function norm(s) {
    return String(s || '')
      .replace(/[\uFF01-\uFF5E]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0); })
      .replace(/[\u2080-\u2089]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x2080 + 48); })
      .replace(/\s+/g, '')
      .replace(/　/g, '');
  }

  function show(view) {
    viewList.hidden = view !== 'list';
    viewQuiz.hidden = view !== 'quiz';
    viewResult.hidden = view !== 'result';
    window.scrollTo(0, 0);
  }

  /* ---- 列表 ---- */
  function renderList() {
    var h = loadHistory();
    quizListEl.innerHTML = QUIZZES.map(function (qz) {
      var rec = h[qz.id];
      var best = rec ? '<span class="best">历史最佳 ' + rec.best + ' 分</span>' : '<span class="best none">还未作答</span>';
      return '<article class="card quiz-card">' +
        '<h3>' + esc(qz.title) + '</h3>' +
        '<p class="desc">' + esc(qz.desc || '') + '</p>' +
        '<div class="card-meta"><span class="date">' + qz.questions.length + ' 道题</span>' + best +
        '<button class="btn" type="button" data-start="' + esc(qz.id) + '">开始</button></div>' +
        '</article>';
    }).join('');
    var btns = quizListEl.querySelectorAll('[data-start]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { startQuiz(this.getAttribute('data-start')); });
    }
  }

  /* ---- 答题 ---- */
  function startQuiz(id) {
    for (var i = 0; i < QUIZZES.length; i++) {
      if (QUIZZES[i].id === id) current = QUIZZES[i];
    }
    if (!current) return;
    document.getElementById('quiz-title').textContent = current.title;
    questionsEl.innerHTML = current.questions.map(function (q, qi) {
      var body;
      if (q.type === 'choice') {
        body = '<div class="options">' + q.options.map(function (op, oi) {
          return '<label class="option"><input type="radio" name="q' + qi + '" value="' + oi + '"><span>' + esc(op) + '</span></label>';
        }).join('') + '</div>';
      } else {
        body = '<input class="blank-input" type="text" name="q' + qi + '" placeholder="在此作答" autocomplete="off">';
      }
      return '<div class="q-card" id="qc' + qi + '"><div class="q-title"><span class="q-no">' + (qi + 1) + '</span>' +
        esc(q.q) + ' <span class="q-type">' + (q.type === 'choice' ? '选择' : '填空') + '</span></div>' + body + '</div>';
    }).join('');
    show('quiz');
  }

  function getAnswer(qi) {
    var q = current.questions[qi];
    if (q.type === 'choice') {
      var sel = questionsEl.querySelector('input[name="q' + qi + '"]:checked');
      return sel ? parseInt(sel.value, 10) : null;
    }
    var inp = questionsEl.querySelector('input[name="q' + qi + '"]');
    return inp ? inp.value : '';
  }

  /* ---- 判分 ---- */
  function submit() {
    var total = current.questions.length;
    var correct = 0;
    var details = current.questions.map(function (q, qi) {
      var mine = getAnswer(qi);
      var ok, mineText, rightText;
      if (q.type === 'choice') {
        ok = mine === q.answer;
        mineText = mine == null ? '未作答' : q.options[mine];
        rightText = q.options[q.answer];
      } else {
        var nm = norm(mine);
        ok = q.answer.some(function (a) { return norm(a) === nm; }) && nm !== '';
        mineText = mine === '' ? '未作答' : mine;
        rightText = q.answer[0];
      }
      if (ok) correct++;
      return { q: q, ok: ok, mineText: mineText, rightText: rightText };
    });

    var score = Math.round(correct / total * 100);
    var h = loadHistory();
    var rec = h[current.id] || { best: 0, count: 0 };
    rec.count++;
    if (score > rec.best) rec.best = score;
    rec.last = new Date().toLocaleDateString();
    h[current.id] = rec;
    saveHistory(h);

    document.getElementById('result-title').textContent = current.title;
    document.getElementById('score-num').textContent = score + ' 分';
    document.getElementById('score-sub').textContent =
      '答对 ' + correct + ' / ' + total + ' 题' + (score === rec.best && rec.count > 1 ? ' · 新纪录！' : ' · 历史最佳 ' + rec.best + ' 分');

    reviewEl.innerHTML = details.map(function (d, qi) {
      return '<div class="q-card ' + (d.ok ? 'right' : 'wrong') + '">' +
        '<div class="q-title"><span class="q-no">' + (qi + 1) + '</span>' + esc(d.q.q) +
        '<span class="verdict">' + (d.ok ? '✓ 答对' : '✗ 答错') + '</span></div>' +
        '<div class="review-row"><span class="rl">你的答案：</span>' + esc(d.mineText) + '</div>' +
        (d.ok ? '' : '<div class="review-row"><span class="rl">正确答案：</span>' + esc(d.rightText) + '</div>') +
        (d.q.explain ? '<div class="review-row explain">解析：' + esc(d.q.explain) + '</div>' : '') +
        '</div>';
    }).join('');
    show('result');
  }

  document.getElementById('btn-submit').addEventListener('click', submit);
  document.getElementById('btn-retry').addEventListener('click', function () { startQuiz(current.id); });
  document.getElementById('btn-back-list').addEventListener('click', function () { renderList(); show('list'); });
  document.getElementById('btn-back-list2').addEventListener('click', function () { renderList(); show('list'); });

  renderList();
  show('list');
})();
