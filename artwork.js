'use strict';

const artworkLinks = Array.from(document.querySelectorAll('[data-artwork]'));
const viewer = document.getElementById('artwork-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerCaption = document.getElementById('viewer-caption');
const viewerCount = document.getElementById('viewer-count');
let currentArtwork = 0;
let previousOverflow = '';

function showArtwork(index) {
  currentArtwork = (index + artworkLinks.length) % artworkLinks.length;
  const link = artworkLinks[currentArtwork];
  viewerImage.src = link.href;
  viewerImage.alt = link.querySelector('img').alt;
  viewerCaption.textContent = link.closest('figure').querySelector('figcaption span').textContent;
  viewerCount.textContent = `${currentArtwork + 1} / ${artworkLinks.length}`;
}

artworkLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.showModal) return;
    event.preventDefault();
    showArtwork(index);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    viewer.showModal();
    document.getElementById('viewer-close').focus();
  });
});
document.getElementById('viewer-close').addEventListener('click', () => viewer.close());
document.getElementById('viewer-prev').addEventListener('click', () => showArtwork(currentArtwork - 1));
document.getElementById('viewer-next').addEventListener('click', () => showArtwork(currentArtwork + 1));
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showArtwork(currentArtwork + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
