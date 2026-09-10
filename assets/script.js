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

document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
  const buttons = tabGroup.querySelectorAll('[data-tab-button]');
  const panels = document.querySelectorAll(`[data-tab-panel][data-tab-group="${tabGroup.dataset.tabs}"]`);

  const activate = (name) => {
    buttons.forEach((button) => {
      const active = button.dataset.tabButton === name;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== name;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => activate(button.dataset.tabButton));
  });

  const initial = [...buttons].find((button) => button.classList.contains('active')) || buttons[0];
  if (initial) activate(initial.dataset.tabButton);
});
