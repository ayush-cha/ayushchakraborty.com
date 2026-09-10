const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
if (btn && links) {
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    btn.setAttribute('aria-expanded', links.classList.contains('open'));
  });
}
const y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();
