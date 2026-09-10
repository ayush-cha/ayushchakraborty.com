# Ayush Chakraborty — Portfolio V1

A deliberately simple static portfolio for research and writing.

## Pages
- `index.html` — homepage
- `research.html` — research index
- `writing.html` — writing index
- `about.html` — biography and CV
- `research/itc.html` — current ITC research project

## Adding a research project
1. Copy `_templates/research-template.html` into `research/` and rename it, e.g. `research/company-name.html`.
2. Edit the title, date, description and body.
3. Put any report/model/code files in `downloads/`.
4. Add a new row to the list in `research.html`.
5. Commit and push to GitHub. Cloudflare Pages will redeploy automatically.

## Adding writing
1. Create a `writing/` directory if it does not exist.
2. Copy `_templates/writing-template.html` into it and rename the file.
3. Write the article.
4. Replace the empty-state block in `writing.html` with a `.list` and `.list-item` entry, following the research page as a pattern.
5. Commit and push.

## Design
The site intentionally uses plain HTML, CSS and a few lines of JavaScript. There is no build step or framework.
