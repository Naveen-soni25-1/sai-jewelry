/* ===========================================================
   Sai Jewelers — shared script
   =========================================================== */

(function(){
  // Resolve current language: URL param wins, then localStorage, then default 'en'
  function getLang(){
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if(urlLang === 'en' || urlLang === 'hi'){
      try{ localStorage.setItem('sj_lang', urlLang); }catch(e){}
      return urlLang;
    }
    try{
      const stored = localStorage.getItem('sj_lang');
      if(stored === 'en' || stored === 'hi') return stored;
    }catch(e){}
    return 'en';
  }

  window.SJ = window.SJ || {};
  window.SJ.lang = getLang();

  window.SJ.applyLang = function(lang){
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    document.querySelectorAll('[data-en]').forEach(function(el){
      const val = lang === 'hi' ? el.getAttribute('data-hi') : el.getAttribute('data-en');
      if(val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('.lang-toggle').forEach(function(btn){
      btn.textContent = lang === 'hi' ? 'English' : 'हिंदी';
      btn.setAttribute('aria-label', lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें');
    });
    // keep links carrying the lang param so it persists across pages
    document.querySelectorAll('a[data-keep-lang]').forEach(function(a){
      try{
        const url = new URL(a.href, window.location.href);
        url.searchParams.set('lang', lang);
        a.href = url.pathname + url.search + url.hash;
      }catch(e){}
    });
  };

  window.SJ.toggleLang = function(){
    const next = window.SJ.lang === 'hi' ? 'en' : 'hi';
    try{ localStorage.setItem('sj_lang', next); }catch(e){}
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.location.href = url.pathname + url.search;
  };

  document.addEventListener('DOMContentLoaded', function(){
    window.SJ.applyLang(window.SJ.lang);

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(navToggle && navLinks){
      navToggle.addEventListener('click', function(){
        navLinks.classList.toggle('open');
      });
    }
  });
})();
