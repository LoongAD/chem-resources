/* 化学教学资料站 - v5 页面逻辑（纯原生 JS，无构建） */
(function () {
  'use strict';

  /* ---------- 基础信息 ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
  document.title = SITE.title + '｜' + SITE.subtitle;

  var tabsEl = document.getElementById('tabs');
  var searchInput = document.getElementById('search');
  var grid = document.getElementById('grid');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');

  var activeCat = '全部';
  var query = '';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- 分类 tabs ---------- */
  ['全部'].concat(CATEGORIES).forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'tab';
    b.type = 'button';
    b.textContent = c;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', c === activeCat ? 'true' : 'false');
    b.addEventListener('click', function () {
      activeCat = c;
      var all = tabsEl.querySelectorAll('.tab');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-selected', 'false');
      b.setAttribute('aria-selected', 'true');
      render();
    });
    tabsEl.appendChild(b);
  });

  /* 顶栏搜索与 hero 搜索联动：hero 的表单提交滚到资料区 */
  searchInput.addEventListener('input', function () {
    query = searchInput.value.trim().toLowerCase();
    render();
  });

  /* ---------- 资料表 ---------- */
  function render() {
    var list = RESOURCES.filter(function (r) {
      var okCat = activeCat === '全部' || r.category === activeCat;
      var okQ = !query || (r.title + ' ' + (r.desc || '')).toLowerCase().indexOf(query) !== -1;
      return okCat && okQ;
    });

    countEl.textContent = '共 ' + list.length + ' 份资料';
    emptyEl.hidden = list.length !== 0;

    grid.innerHTML = list.map(function (r) {
      return '<a class="row rise in" href="preview.html?src=' + encodeURIComponent(r.file) +
        '&title=' + encodeURIComponent(r.title) + '">' +
        '<span class="row-kind">' + esc(r.category) + '</span>' +
        '<span class="row-title">' + esc(r.title) + '</span>' +
        '<span class="row-date">' + (r.date ? esc(r.date) : '') + '</span>' +
        '<span class="row-arrow" aria-hidden="true">→</span>' +
        '</a>';
    }).join('');
  }

  /* ---------- 首页小测入口行 ---------- */
  var quizRows = document.getElementById('quiz-rows');
  function quizHistory() {
    try { return JSON.parse(localStorage.getItem('chem-quiz-history-v1')) || {}; }
    catch (e) { return {}; }
  }
  if (quizRows && typeof QUIZZES !== 'undefined') {
    var h = quizHistory();
    quizRows.innerHTML = QUIZZES.map(function (qz) {
      var rec = h[qz.id];
      var best = rec
        ? '<span class="qr-best">历史最佳 ' + rec.best + ' 分</span>'
        : '<span class="qr-best none">还未作答</span>';
      return '<a class="quiz-row" href="quiz.html#' + esc(qz.id) + '">' +
        '<span class="qr-title">' + esc(qz.title) + '</span>' +
        '<span class="qr-meta">' + qz.questions.length + ' 道题</span>' +
        best +
        '<span class="row-arrow" aria-hidden="true">→</span>' +
        '</a>';
    }).join('');
  }

  /* ---------- 随手一测（live thing） ---------- */
  var liveQ = document.getElementById('live-q');
  var liveOpts = document.getElementById('live-opts');
  var liveFb = document.getElementById('live-feedback');
  var liveNext = document.getElementById('live-next');

  function pickQuestion() {
    if (typeof QUIZZES === 'undefined') return null;
    var all = [];
    QUIZZES.forEach(function (qz) {
      qz.questions.forEach(function (q) { all.push({ quiz: qz, q: q }); });
    });
    if (!all.length) return null;
    return all[Math.floor(Math.random() * all.length)];
  }

  function norm(s) {
    return String(s || '')
      .replace(/[！-～]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0); })
      .replace(/[₀-₉]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x2080 + 48); })
      .replace(/\s+/g, '');
  }

  function dealLive() {
    var item = pickQuestion();
    if (!item) {
      liveQ.textContent = '题库加载中…';
      liveOpts.innerHTML = '';
      return;
    }
    var q = item.q;
    liveFb.innerHTML = '';
    liveQ.textContent = q.q.replace(/____/g, '＿＿');
    liveOpts.innerHTML = '';
    if (q.type === 'choice') {
      q.options.forEach(function (op, oi) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'live-opt';
        b.textContent = op;
        b.addEventListener('click', function () {
          var ok = oi === q.answer;
          var btns = liveOpts.querySelectorAll('.live-opt');
          for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = true;
            if (i === q.answer) btns[i].classList.add('right');
          }
          if (!ok) b.classList.add('wrong');
          liveFb.innerHTML = ok ? '<b class="right">答对了。</b>'
            : '<b class="wrong">答错了。</b>正确答案：' + esc(q.options[q.answer]) +
              (q.explain ? ' —— ' + esc(q.explain) : '');
        });
        liveOpts.appendChild(b);
      });
    } else {
      var wrap = document.createElement('div');
      wrap.style.display = 'flex';
      wrap.style.gap = '10px';
      var inp = document.createElement('input');
      inp.className = 'q-blank';
      inp.placeholder = '在此作答，回车判分';
      inp.setAttribute('aria-label', '填空作答');
      var go = document.createElement('button');
      go.type = 'button';
      go.className = 'btn-ghost';
      go.textContent = '判分';
      var check = function () {
        var nm = norm(inp.value);
        var ok = nm !== '' && q.answer.some(function (a) { return norm(a) === nm; });
        inp.disabled = true;
        go.disabled = true;
        liveFb.innerHTML = ok ? '<b class="right">答对了。</b>'
          : '<b class="wrong">答错了。</b>正确答案：' + esc(q.answer[0]) +
            (q.explain ? ' —— ' + esc(q.explain) : '');
      };
      go.addEventListener('click', check);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      wrap.appendChild(inp);
      wrap.appendChild(go);
      liveOpts.appendChild(wrap);
    }
  }
  if (liveNext) {
    liveNext.addEventListener('click', dealLive);
    dealLive();
  }

  /* ---------- 入场动效 ---------- */
  function reveal() {
    var els = document.querySelectorAll('.rise');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < els.length; j++) {
      if (!els[j].classList.contains('in')) io.observe(els[j]);
    }
  }

  /* 给各 section 加 rise */
  ['.sec-head', '.list-grid', '.stack', '.quiz-facts', '.quiz-rows', '.cta h2', '.cta p', '.cta .btn-accent']
    .forEach(function (sel) {
      var n = document.querySelector(sel);
      if (n) n.classList.add('rise');
    });

  render();
  reveal();
})();
