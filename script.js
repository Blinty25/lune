const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
}
toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });

const track = document.querySelector('#work-track');
const controls = document.querySelector('.work-controls');
const [previous, next] = controls.querySelectorAll('button');
function updateGallery() {
  const end = track.scrollWidth - track.clientWidth;
  controls.hidden = end <= 2;
  previous.disabled = track.scrollLeft <= 2;
  next.disabled = track.scrollLeft >= end - 2;
}
controls.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const cardWidth = track.firstElementChild.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).columnGap);
  track.scrollBy({ left: Number(button.dataset.step) * (cardWidth + gap),
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});
track.addEventListener('scroll', updateGallery, { passive: true });
new ResizeObserver(updateGallery).observe(track);
updateGallery();
