/* VeelIQ shared behavior for content pages */
(function () {
  /* Theme */
  var root = document.documentElement;
  var THEME_KEY = 'veeliq-theme';
  function setTheme(t) {
    root.dataset.theme = t;
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var sunIcon = document.getElementById('sun-icon');
    if (sunIcon) {
      if (t === 'dark') sunIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      else sunIcon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
    }
  }
  try { setTheme(localStorage.getItem(THEME_KEY) || 'light'); } catch (e) { setTheme('light'); }
  var toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* Nav scroll state */
  var nav = document.getElementById('nav');
  if (nav) addEventListener('scroll', function () {
    nav.classList.toggle('is-scrolled', scrollY > 10);
  }, { passive: true });

  /* Hamburger */
  var hamburger = document.getElementById('hamburger');
  var navDrawer = document.getElementById('nav-drawer');
  if (hamburger && navDrawer) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      navDrawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navDrawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navDrawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Open FAQ item when linked via #anchor */
  function openFromHash() {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
  openFromHash();
  addEventListener('hashchange', openFromHash);
})();
