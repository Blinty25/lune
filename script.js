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

const choice = document.querySelector('#service-choice');
const cards = Array.from(document.querySelectorAll('.service-card'));
function showService() {
  const card = cards[choice.selectedIndex];
  if (!card) return;
  document.querySelector('#service-price').textContent = card.querySelector('.service-bottom b').textContent;
  document.querySelector('#service-description').textContent = card.querySelector('.service-content > p').textContent;
}
cards.forEach((card, index) => {
  choice.add(new Option(card.querySelector('h3').textContent));
  card.querySelector('.service-arrow').addEventListener('click', () => {
    choice.selectedIndex = index;
    showService();
  });
});
choice.addEventListener('change', showService);
showService();
