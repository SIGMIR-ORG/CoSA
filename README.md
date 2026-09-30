# CoSA project website

Static academic project page for **CoSA: The Conflict of Skills Attack in Real-World LLM Agent Ecosystems**. Includes the approved five-step animation, original paper figures, evaluation tables, manuscript PDF, and verified title/author citation.

## Local preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/. No package installation or build is needed.

## GitHub Pages

Repository: [SIGMIR-ORG/CoSA](https://github.com/SIGMIR-ORG/CoSA).
GitHub Pages URL: `https://sigmir-org.github.io/CoSA/`.

In repository **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**. Keep `.nojekyll` in the repository root. All asset paths are relative, including the paper, figures, stylesheets, and scripts.

## Maintenance

- Page and research content: `index.html`.
- Template foundation: `static/css/style.css`.
- CoSA styling: `static/css/cosa.css`.
- Animation: `static/css/animation.css` and `static/js/animation.js`.
- Citation copy: `static/js/main.js`.
- Paper and original figures: `static/pdfs/` and `static/images/`.

The animation supports Play/Pause, Replay, individual steps, keyboard navigation, and reduced-motion preferences. Its complete transcript remains readable without JavaScript.

See `SOURCES.md` for scientific provenance and `UPSTREAM.md` for template attribution. The template/design license is retained in `LICENSE`; manuscript text and figures retain their authors’ rights.
