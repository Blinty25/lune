(() => {
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.getElementById('mobile-menu');
  function closeMenu(){if(!menu)return;menu.hidden=true;toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Открыть меню');}
  toggle?.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded', String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  const toast=document.querySelector('.toast'); let toastTimer;
  function showDemo(){if(!toast)return;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true},4500)}
  document.querySelectorAll('[data-demo-book]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showDemo()}));
  document.querySelectorAll('[data-book]').forEach(el=>el.addEventListener('click',()=>{closeMenu()}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(toast)toast.hidden=true}});
})();
