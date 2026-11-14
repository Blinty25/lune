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

const bookingDialog = document.querySelector('#booking-dialog');
const bookingForm = document.querySelector('#booking-form');
const serviceSelect = document.querySelector('#booking-service');
const bookingPrice = document.querySelector('#booking-price');
const bookingResult = document.querySelector('#booking-result');
const services = [...document.querySelectorAll('.service-card')].map(card => ({
  id: card.querySelector('[data-service]').dataset.service,
  name: card.querySelector('h3').textContent,
  price: card.querySelector('.service-bottom b').textContent,
}));
services.forEach(service => serviceSelect.add(new Option(service.name, service.id)));

function showService() {
  const service = services.find(item => item.id === serviceSelect.value);
  bookingPrice.textContent = service.price;
}
serviceSelect.addEventListener('change', showService);

document.querySelectorAll('[data-booking]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    if (button.dataset.service) serviceSelect.value = button.dataset.service;
    bookingForm.hidden = false;
    bookingResult.hidden = true;
    showService();
    bookingDialog.showModal();
    document.body.classList.add('booking-open');
    serviceSelect.focus();
  });
});
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  const service = services.find(item => item.id === serviceSelect.value);
  bookingResult.querySelector('.booking-selection').textContent =
    'Вы выбрали: ' + service.name + ' · ' + service.price;
  bookingForm.hidden = true;
  bookingResult.hidden = false;
  bookingResult.querySelector('button').focus();
});
document.querySelector('.booking-back').addEventListener('click', () => {
  bookingResult.hidden = true;
  bookingForm.hidden = false;
  serviceSelect.focus();
});
document.querySelector('.booking-close').addEventListener('click', () => bookingDialog.close());
bookingDialog.addEventListener('click', event => {
  const bounds = bookingDialog.getBoundingClientRect();
  if (event.target === bookingDialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
       event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    bookingDialog.close();
  }
});
bookingDialog.addEventListener('close', () => {
  document.body.classList.remove('booking-open');
  if (document.activeElement.closest('#mobile-menu') && menu.hidden) toggle.focus();
});
