/* 在线小测 - v5 答题、判分、本地成绩（纯原生 JS，无构建） */
(function () {
  'use strict';

  var STORE_KEY = 'chem-quiz-history-v1';

  var viewList = document.getElementById('view-list');
  var viewQuiz = document.getElementById('view-quiz');
  var viewResult = document.getElementById('view-result');
  var quizListEl = document.getElementById('quiz-list');
  var questionsEl = document.getElementById('questions');
  var reviewEl = document.getElementById('review');

  var current = null;
  var picked = {}; // qi -> 选项下标

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

  function norm(s) {
    return String(s || '')
      .replace(/[！-～]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0); })
      .replace(/[₀-₉]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x2080 + 48); })
      .replace(/\s+/g, '');
  }

  function show(view) {
    viewList.hidden = view !== 'list';
    viewQuiz.hidden = view !== 'quiz';
    viewResult.hidden = view !== 'result';
    window.scrollTo(0, 0);
  }

  function totalCount() {
    var n = 0;
    for (var i = 0; i < QUIZZES.length; i++) n += QUIZZES[i].questions.length;
    return n;
  }

  /* ---- 列表 ---- */
  function renderList() {
    var h = loadHistory();
    document.getElementById('quiz-sub').textContent =
      QUIZZES.length + ' 套 · ' + totalCount() + ' 道题 · 即时判分，最高分存在本机浏览器';
    quizListEl.innerHTML = QUIZZES.map(function (qz) {
      var rec = h[qz.id];
      var best = rec
        ? '<span class="best">历史最佳 ' + rec.best + ' 分</span>'
        : '<span class="best none">还未作答</span>';
      return '<article class="qz-item">' +
        '<h3>' + esc(qz.title) + '</h3>' +
        '<button class="btn-accent btn-sm" type="button" data-start="' + esc(qz.id) + '">开始</button>' +
        '<p class="desc">' + esc(qz.desc || '') + '</p>' +
        '<div class="meta">' + best + '</div>' +
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
    picked = {};
    document.getElementById('quiz-title').textContent = current.title;
    document.getElementById('quiz-progress').textContent = current.questions.length + ' 道题';
    questionsEl.innerHTML = current.questions.map(function (q, qi) {
      var body;
      if (q.type === 'choice') {
        body = '<div class="q-opts">' + q.options.map(function (op, oi) {
          var letter = String.fromCharCode(65 + oi);
          return '<button type="button" class="q-opt" data-qi="' + qi + '" data-oi="' + oi + '" aria-pressed="false">' +
            '<span class="k">' + letter + '</span><span>' + esc(op.replace(/^[A-D]\.\s*/, '')) + '</span></button>';
        }).join('') + '</div>';
      } else {
        body = '<input class="q-blank" type="text" name="q' + qi + '" placeholder="在此作答" autocomplete="off" aria-label="第' + (qi + 1) + '题填空作答">';
      }
      return '<div class="q-block" id="qc' + qi + '">' +
        '<p class="q-stem"><span class="q-no">Q' + (qi + 1) + '</span>' + esc(q.q) +
        '<span class="q-kind">' + (q.type === 'choice' ? '选择' : '填空') + '</span></p>' + body + '</div>';
    }).join('');

    var opts = questionsEl.querySelectorAll('.q-opt');
    for (var k = 0; k < opts.length; k++) {
      opts[k].addEventListener('click', function () {
        var qi = +this.getAttribute('data-qi');
        var oi = +this.getAttribute('data-oi');
        picked[qi] = oi;
        var sibs = questionsEl.querySelectorAll('.q-opt[data-qi="' + qi + '"]');
        for (var s = 0; s < sibs.length; s++) {
          sibs[s].setAttribute('aria-pressed', sibs[s] === this ? 'true' : 'false');
        }
      });
    }
    if (window.location.hash !== '#' + current.id) {
      try { history.replaceState(null, '', '#' + current.id); } catch (e) {}
    }
    show('quiz');
  }

  function getAnswer(qi) {
    var q = current.questions[qi];
    if (q.type === 'choice') {
      return picked[qi] == null ? null : picked[qi];
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
        mineText = mine == null ? '未作答' : q.options[mine].replace(/^[A-D]\.\s*/, '');
        rightText = q.options[q.answer].replace(/^[A-D]\.\s*/, '');
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
    var isRecord = score > rec.best;
    if (isRecord) rec.best = score;
    h[current.id] = rec;
    saveHistory(h);

    document.getElementById('score-num').textContent = score;
    document.getElementById('score-sub').innerHTML =
      '答对 ' + correct + ' / ' + total + ' 题' +
      (isRecord && rec.count > 1 ? ' · <b>新纪录！</b>' : ' · 历史最佳 ' + rec.best + ' 分');

    reviewEl.innerHTML = details.map(function (d, qi) {
      return '<div class="q-block ' + (d.ok ? 'right' : 'wrong') + '">' +
        '<p class="q-stem"><span class="q-no">Q' + (qi + 1) + '</span>' + esc(d.q.q) +
        '<span class="verdict">' + (d.ok ? '答对' : '答错') + '</span></p>' +
        '<p class="review-line"><span class="rl">你的答案：</span>' + esc(d.mineText) + '</p>' +
        (d.ok ? '' : '<p class="review-line"><span class="rl">正确答案：</span>' + esc(d.rightText) + '</p>') +
        (d.q.explain ? '<p class="review-line explain">解析：' + esc(d.q.explain) + '</p>' : '') +
        '</div>';
    }).join('');
    try { history.replaceState(null, '', '#result'); } catch (e) {}
    show('result');
  }

  document.getElementById('btn-submit').addEventListener('click', submit);
  document.getElementById('btn-retry').addEventListener('click', function () { startQuiz(current.id); });
  function backToList() {
    renderList();
    try { history.replaceState(null, '', ' '); } catch (e) {}
    show('list');
  }
  document.getElementById('btn-back-list').addEventListener('click', backToList);
  document.getElementById('btn-back-list2').addEventListener('click', backToList);

  renderList();
  /* 首页可带 #unit1 直达某套题 */
  var hash = (window.location.hash || '').replace('#', '');
  var found = false;
  for (var i = 0; i < QUIZZES.length; i++) {
    if (QUIZZES[i].id === hash) { found = true; break; }
  }
  show(found ? 'quiz' : 'list');
  if (found) startQuiz(hash);
})();
