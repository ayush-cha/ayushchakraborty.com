const dashboardProjects = {
  itc: {
    type: 'Equity research', date: '9 September 2026', title: 'ITC Limited',
    summary: 'A multi-method valuation testing ITC through DCF, sum-of-the-parts and a forward earnings cross-check.',
    link: 'research/itc.html', chartTitle: 'Valuation cross-check', unit: '₹ per share',
    kpis: [['Reference price', '₹263.50', 'Valuation date'], ['Blended target', '₹372', 'Model output'], ['Implied upside', '41%', 'Before dividends'], ['FY26 dividend yield', '5.5%', 'At reference price']],
    bars: [['Reference price', 263.5], ['SOTP', 356], ['P/E cross-check', 373], ['DCF', 386]],
    viewTitle: 'Valuation methods converge above the reference price.',
    viewBody: 'The blended ₹372 target sits between the SOTP and DCF outcomes, while the forward P/E cross-check provides a third point of reference.',
    method: 'DCF · SOTP · P/E', files: 'PDF · Excel · R · CSV'
  },
  mitie: {
    type: 'M&A analysis', date: 'September 2026', title: 'OCS / Mitie',
    summary: 'An assessment of the offer premium, strategic rationale, financing burden and illustrative merger economics.',
    link: 'research/ocs-mitie.html', chartTitle: 'Offer value comparison', unit: 'pence per share',
    kpis: [['Equity value', '£3.1bn', 'Fully diluted'], ['Cash offer', '218.5p', 'Per share'], ['Headline value', '221.6p', 'Including dividend'], ['Headline premium', '46.8%', 'To unaffected close']],
    bars: [['Unaffected price', 151], ['Cash offer', 218.5], ['Headline value', 221.6]],
    viewTitle: 'Strategically credible, but financially demanding.',
    viewBody: 'The industrial fit is clear, but the control premium and financing package leave execution, cash conversion and deleveraging central to the case.',
    method: 'Premium · leverage · scenarios', files: 'PDF · Excel'
  },
  thames: {
    type: 'Restructuring', date: 'March 2026', title: 'Thames Water',
    summary: 'A creditor-led assessment of the proposed recapitalisation, recovery waterfall and post-transaction leverage.',
    link: 'research/thames-water.html', chartTitle: 'Capital reset', unit: '£ billions',
    kpis: [['Statutory net debt', '£17.6bn', 'Pre-restructuring'], ['Senior gearing', '85.9%', 'Pre-restructuring'], ['Proposed new equity', '£3.35bn', 'Fresh capital'], ['Day-one gearing', '52%', 'Proposal target']],
    bars: [['Day-one debt', 3.25], ['New equity', 3.35], ['Undrawn debt', 3.3]],
    viewTitle: 'A more credible starting point, not a complete solution.',
    viewBody: 'The proposal forces legacy capital to absorb losses and introduces new equity, but resilience still depends on operating delivery, regulatory support and disciplined funding.',
    method: 'Waterfall · recovery · leverage', files: 'PDF · Excel'
  }
};

const dashboardButtons = [...document.querySelectorAll('[data-dashboard-project]')];
const dashboard = document.querySelector('.dashboard-project');

function setDashboardProject(name) {
  const project = dashboardProjects[name];
  if (!project || !dashboard) return;
  dashboardButtons.forEach((button) => {
    const active = button.dataset.dashboardProject === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  dashboard.querySelector('[data-dash-type]').textContent = project.type;
  dashboard.querySelector('[data-dash-date]').textContent = project.date;
  dashboard.querySelector('[data-dash-title]').textContent = project.title;
  dashboard.querySelector('[data-dash-summary]').textContent = project.summary;
  dashboard.querySelector('[data-dash-link]').href = project.link;
  dashboard.querySelector('[data-chart-title]').textContent = project.chartTitle;
  dashboard.querySelector('[data-chart-unit]').textContent = project.unit;
  dashboard.querySelector('[data-view-title]').textContent = project.viewTitle;
  dashboard.querySelector('[data-view-body]').textContent = project.viewBody;
  dashboard.querySelector('[data-method]').textContent = project.method;
  dashboard.querySelector('[data-files]').textContent = project.files;

  dashboard.querySelector('[data-dash-kpis]').innerHTML = project.kpis.map(([label, value, note]) => `<div><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join('');
  const max = Math.max(...project.bars.map(([, value]) => value));
  dashboard.querySelector('[data-dash-chart]').innerHTML = project.bars.map(([label, value]) => `<div class="dash-bar-row"><span>${label}</span><div class="dash-bar-track"><span style="width:${(value / max) * 100}%"></span></div><strong>${Number.isInteger(value) ? value : value.toFixed(value < 10 ? 2 : 1)}</strong></div>`).join('');
  history.replaceState(null, '', `#${name}`);
}

dashboardButtons.forEach((button, index) => {
  button.addEventListener('click', () => setDashboardProject(button.dataset.dashboardProject));
  button.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % dashboardButtons.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + dashboardButtons.length) % dashboardButtons.length;
    if (next !== undefined) { event.preventDefault(); dashboardButtons[next].click(); dashboardButtons[next].focus(); }
  });
});

setDashboardProject(dashboardProjects[location.hash.slice(1)] ? location.hash.slice(1) : 'itc');
