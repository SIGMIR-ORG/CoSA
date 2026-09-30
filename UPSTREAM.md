# Implementation foundation

- Repository: https://github.com/seemandhar/paper-template
- Retrieved commit: `7e6937d47faed01900455e0db8d3af876f883c69`
- License: CC BY-SA 4.0 (LICENSE retained).

The implementation retains the template's local file structure, CSS foundation, hero/author/resource layout, section containers, figure widths, and table wrapper approach. `static/css/cosa.css` adapts it for CoSA. The content hierarchy is abstract → results and setup → method → threat model → disclosure case → defense → citation.

Demo material, CV labels and metrics, video assumptions, visitor tracking, CDN fonts/icons, fade-in dependencies, and fake external-resource buttons are excluded. JavaScript handles citation copying and the approved five-step CoSA animation; disclosures are native HTML. The animation uses inline SVG with scoped CSS and a separate vanilla JavaScript file. No framework or external animation dependency is added. Paper and figures retain their authors' rights.
