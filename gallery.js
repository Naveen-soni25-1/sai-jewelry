/* ===========================================================
   Sai Jewelers — category photo gallery + lightbox
   Reads assets/categories/<folder>/manifest.json for each card.
   If a folder has images listed, swaps the illustration for the
   first photo and enables a click-to-view gallery.
   =========================================================== */

(function(){
  let currentImages = [];
  let currentIndex = 0;
  let currentFolder = '';
  let currentTitleEn = '';
  let currentTitleHi = '';

  function buildLightbox(){
    if(document.getElementById('sjLightbox')) return;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'sjLightbox';
    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Close" id="lbClose">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous" id="lbPrev">&#10094;</button>
        <img id="lbImage" src="" alt="">
        <button class="lightbox-nav lightbox-next" aria-label="Next" id="lbNext">&#10095;</button>
        <div class="lightbox-caption" id="lbCaption"></div>
        <div class="lightbox-count" id="lbCount"></div>
      </div>`;
    document.body.appendChild(overlay);

    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) closeLightbox(); });
    document.getElementById('lbPrev').addEventListener('click', function(){ navLightbox(-1); });
    document.getElementById('lbNext').addEventListener('click', function(){ navLightbox(1); });
    document.addEventListener('keydown', function(e){
      if(!overlay.classList.contains('open')) return;
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') navLightbox(-1);
      if(e.key === 'ArrowRight') navLightbox(1);
    });
  }

  function openLightbox(images, startIndex, folder, titleEn, titleHi){
    currentImages = images;
    currentIndex = startIndex;
    currentFolder = folder;
    currentTitleEn = titleEn;
    currentTitleHi = titleHi;
    renderLightbox();
    document.getElementById('sjLightbox').classList.add('open');
  }

  function closeLightbox(){
    document.getElementById('sjLightbox').classList.remove('open');
  }

  function navLightbox(dir){
    currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
    renderLightbox();
  }

  function renderLightbox(){
    const lang = (window.SJ && window.SJ.lang) ? window.SJ.lang : 'en';
    const file = currentImages[currentIndex];
    document.getElementById('lbImage').src = 'assets/categories/' + currentFolder + '/' + file;
    document.getElementById('lbImage').alt = (lang === 'hi' ? currentTitleHi : currentTitleEn);
    document.getElementById('lbCaption').textContent = (lang === 'hi' ? currentTitleHi : currentTitleEn);
    document.getElementById('lbCount').textContent = (currentIndex + 1) + ' / ' + currentImages.length;
    const showNav = currentImages.length > 1;
    document.getElementById('lbPrev').style.display = showNav ? 'flex' : 'none';
    document.getElementById('lbNext').style.display = showNav ? 'flex' : 'none';
  }

  function cameraIconSvg(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  }

  async function loadCardImages(card){
    const folder = card.getAttribute('data-folder');
    if(!folder) return;

    let manifest;
    try{
      const res = await fetch('assets/categories/' + folder + '/manifest.json', {cache:'no-store'});
      if(!res.ok) return;
      manifest = await res.json();
    }catch(e){
      return; // no manifest yet — keep illustration
    }

    const images = (manifest && Array.isArray(manifest.images)) ? manifest.images.filter(Boolean) : [];
    if(images.length === 0) return; // keep the illustration placeholder

    const thumb = card.querySelector('.cat-thumb');
    const titleEn = card.querySelector('h4') ? card.querySelector('h4').getAttribute('data-en') : '';
    const titleHi = card.querySelector('h4') ? card.querySelector('h4').getAttribute('data-hi') : '';

    // Replace illustration with real photo
    thumb.innerHTML = '';
    const img = document.createElement('img');
    img.className = 'thumb-photo';
    img.src = 'assets/categories/' + folder + '/' + images[0];
    img.alt = titleEn;
    img.loading = 'lazy';
    thumb.appendChild(img);

    const badge = document.createElement('span');
    badge.className = 'photo-count';
    badge.innerHTML = cameraIconSvg() + ' <span>' + images.length + '</span>';
    thumb.appendChild(badge);

    thumb.style.cursor = 'zoom-in';
    thumb.addEventListener('click', function(){
      openLightbox(images, 0, folder, titleEn, titleHi);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const cards = document.querySelectorAll('.cat-card[data-folder]');
    if(cards.length === 0) return;
    buildLightbox();
    cards.forEach(loadCardImages);
  });
})();
