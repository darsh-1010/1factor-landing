# 1Factor Landing Page

Responsive landing page for 1Factor, a global supply chain finance platform.

## Features
- Hero with animated dashed trade routes, travelling dots and floating finance cards
- Scrolling currency-rate ticker
- Eight service cards with 3D tilt and glow on hover
- Expanding product slides (auto-advance, hover and click)
- Animated "How it works" timeline
- Scroll-reveal animations and mobile hamburger menu
- Responsive from phone to desktop

## Tech
Plain HTML, CSS and JavaScript. No build step and no dependencies. Fonts load from Google Fonts.

## Structure
```
index.html      markup
styles.css      all styles
script.js       all behaviour (cards, slides, timeline, ticker, hero animation)
assets/         port.jpg, containers.jpg
```

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then visit http://localhost:5173.

## Deploy on Vercel
No CI/CD pipeline is needed. Vercel deploys from GitHub automatically.

1. On vercel.com choose **Add New → Project** and import this repo.
2. Framework preset: **Other**. Leave the build command empty and the output directory as the project root.
3. Every push to `main` deploys to production. Every other branch or pull request gets a preview URL.
