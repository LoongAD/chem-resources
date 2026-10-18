/* 化学教学资料站 - 页面逻辑（无需构建，纯原生 JS） */
(function () {
  'use strict';

  var grid = document.getElementById('grid');
  var tabs = document.getElementById('tabs');
  var searchInput = document.getElementById('search');
  var countEl = document.getElementById('count');
  var emptyEl = document.getElementById('empty');

  // 站点头衔取自 data/resources.js 的 SITE 配置
  document.getElementById('site-title').textContent = SITE.title;
  document.getElementById('site-subtitle').textContent = SITE.subtitle;
  document.title = SITE.title + '｜' + SITE.subtitle;
  document.getElementById('footer-text').textContent =
    '© ' + new Date().getFullYear() + ' ' + SITE.teacher + ' · 本站资料仅供教学使用';

  var activeCat = '全部';
  var query = '';

  // 生成分类标签
  var cats = ['全部'].concat(CATEGORIES);
  cats.forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'tab' + (c === activeCat ? ' active' : '');
    b.type = 'button';
    b.textContent = c;
    b.addEventListener('click', function () {
      activeCat = c;
      var all = tabs.querySelectorAll('.tab');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('active');
      b.classList.add('active');
      render();
    });
    tabs.appendChild(b);
  });

  searchInput.addEventListener('input', function () {
    query = searchInput.value.trim().toLowerCase();
    render();
  });

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    var list = RESOURCES.filter(function (r) {
      var okCat = activeCat === '全部' || r.category === activeCat;
      var okQ = !query ||
        (r.title + ' ' + (r.desc || '')).toLowerCase().indexOf(query) !== -1;
      return okCat && okQ;
    });

    countEl.textContent = '共 ' + list.length + ' 份资料';
    emptyEl.hidden = list.length !== 0;

    grid.innerHTML = list.map(function (r) {
      return (
        '<article class="card" data-cat="' + esc(r.category) + '">' +
          '<div class="card-top">' +
            '<span class="tag" data-cat="' + esc(r.category) + '">' + esc(r.category) + '</span>' +
            (r.format ? '<span class="format">' + esc(r.format) + '</span>' : '') +
          '</div>' +
          '<h3>' + esc(r.title) + '</h3>' +
          (r.desc ? '<p class="desc">' + esc(r.desc) + '</p>' : '') +
          '<div class="card-meta">' +
            '<span class="date">' + (r.date ? '更新 ' + esc(r.date) : '') + '</span>' +
            '<a class="btn" href="preview.html?src=' + encodeURIComponent(r.file) + '&amp;title=' + encodeURIComponent(r.title) + '">在线预览</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  render();
})();
