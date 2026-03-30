# Signal Museum

A retro-futurist interactive exhibition page built around old media signals, CRT moods, analog noise, and speculative display aesthetics.

## Overview

Signal Museum turns media nostalgia into a small interactive gallery. Instead of presenting one fixed scene, it offers a rotating set of visual exhibits inspired by dial-up noise, CRT scan lines, cassette meter bars, radar sweeps, and monitor-style displays.

## Highlights

- Multiple visual exhibits in one standalone page
- Manual exhibit switching and random browsing
- Automatic gallery tour mode
- Export the current frame as an image
- Visible GitHub repo entry inside the page UI
- Static deployment with no backend
- Strong retro media and sci-fi visual identity

## Positioning

This project works well as:
- a retro media art page
- a themed exhibition-style microsite
- a visual portfolio piece
- a mood-heavy standalone interactive experience

## Project Structure

```text
signal-museum/
├── index.html
├── README.md
├── favicon.svg
├── css/
│   ├── base.css
│   └── app.css
├── js/
│   ├── data.js
│   ├── scene.js
│   ├── ui.js
│   └── main.js
└── assets/
```

## Architecture Notes

- `index.html` provides the semantic shell for the exhibition page
- `css/base.css` defines the shared base layer for controls and typography
- `css/app.css` defines the visual exhibition layout and styling
- `js/data.js` stores the exhibit metadata
- `js/scene.js` contains the canvas draw logic and autoplay render loop
- `js/ui.js` handles exhibit list rendering, toolbar behavior, and content sync
- `js/main.js` connects UI state with rendering

## Local Preview

```bash
cd signal-museum
python3 -m http.server 8080
```

Then open:

- <http://localhost:8080>

## Deployment

This project is static-only and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any basic static host

## Repository

- GitHub: <https://github.com/wanxb/signal-museum>

## Notes

- No build process is required
- Works as a single-page interactive exhibition with a clearer internal structure
- Refactored from a single HTML implementation into a modular static project layout
