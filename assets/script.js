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
  const buttons = [...tabGroup.querySelectorAll('[data-tab-button]')];
  const panels = document.querySelectorAll(`[data-tab-panel][data-tab-group="${tabGroup.dataset.tabs}"]`);

  const activate = (name) => {
    buttons.forEach((button) => {
      const active = button.dataset.tabButton === name;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.setAttribute('tabindex', active ? '0' : '-1');
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== name;
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      activate(button.dataset.tabButton);
      history.replaceState(null, '', `#${button.dataset.tabButton}`);
    });
    button.addEventListener('keydown', (event) => {
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== null) {
        event.preventDefault();
        buttons[next].click();
        buttons[next].focus();
      }
    });
  });

  const hashName = window.location.hash.slice(1);
  const initial = buttons.find((button) => button.dataset.tabButton === hashName) || buttons.find((button) => button.classList.contains('active')) || buttons[0];
  if (initial) activate(initial.dataset.tabButton);
});

const toc = document.querySelector('[data-article-toc]');
const draft = document.querySelector('#rough-draft');
if (toc && draft) {
  const headings = [...draft.querySelectorAll('h2')].filter((heading) => heading.textContent !== 'Rough draft');
  const list = document.createElement('ol');
  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `section-${index + 1}`;
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    item.appendChild(link);
    list.appendChild(item);
  });
  toc.appendChild(list);
}
