const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
if (btn && links) {
  const setOpen = (open) => {
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  btn.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      setOpen(false);
      btn.focus();
    }
  });
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
}
const y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();
